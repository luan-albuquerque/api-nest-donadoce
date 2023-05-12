import { UserRepository } from "src/modules/users/repository/UserRepository";
import RedefinePasswordDTO from "../dtos/RedefinePasswordDTO";
import Token from "../entities/Token";
import { TokenRepository } from "../repository/TokenRepository";
import {
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from "src/modules/users/entities/user.entity";
import { isAfter } from "date-fns";
import SendEmailConfirmRecoverPasswordService from "src/modules/mail/services/sendEmailConfirmRecoveyPassword.service";
import BCryptHashPassword from "../providers/Hash/implementations/BCryptHashPassword";

@Injectable()
export default class RedefinePasswordService {
    constructor(
        private readonly tokenReposisoty: TokenRepository,
        private readonly userRepository: UserRepository,
        @Inject(BCryptHashPassword)
        private readonly hash: IHashPasswordContract,
        private mail: SendEmailConfirmRecoverPasswordService
    ) { }

    async execute({ token, password, confirmpassword }: RedefinePasswordDTO) {
        try {
            const tokenRedefinePass: Token = await this.tokenReposisoty.findbyToken(token)
            if (!tokenRedefinePass) {
                throw new NotFoundException('Este token não existe.');
            }
            const user: User = await this.userRepository.findById(tokenRedefinePass.user_id)

            if (!user) {
                throw new NotFoundException(
                    'Este usuário deste token não existe',
                );
            }

            const tokens: Token[] = await this.tokenReposisoty.findTokensByUser(user.id)
            //            Validação de Expiração de Token
            tokens.map((otherToken) => {
                if (!isAfter(new Date(tokenRedefinePass.expires), new Date())) {
                    throw new UnauthorizedException('Este token expirou')
                }
            })
            //            Validar se já foi usado
            if (tokenRedefinePass.used || tokenRedefinePass.used_in !== null) {
                throw new UnauthorizedException("Este token foi usado anteriormente")
            }

            //            Validar se senhas são iguais
            if (password != confirmpassword) {
                throw new UnauthorizedException('Estas senhas repassadas não correspondem',)
            }

            // Verificar se senha é igual a antiga
            const newPassIsEqualLastPassword: boolean = await this.hash.compareHash(password, user.password)
            if (newPassIsEqualLastPassword) {
                throw new UnauthorizedException('Esta nova senha é igual a última senha, tente outra',)
            }

            const passwordHash: string = await this.hash.generateHash(password)

            await this.userRepository.updatePassword(user.id, passwordHash);
            await this.tokenReposisoty.update(tokenRedefinePass.id, true, new Date())
            await this.mail.execute({user})

        } catch (error) {
            if (error) throw error;
            throw new InternalServerErrorException(
              'Error intern in server, please try again',
            );
          }
        }

    }

