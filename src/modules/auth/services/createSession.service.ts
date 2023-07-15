import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import BCryptHashPassword from "../providers/Hash/implementations/BCryptHashPassword";

import CreateSessionDTO from "../dtos/CreateSessionDTO";
import { User } from "src/modules/users/entities/user.entity";
import { secret } from "src/config/jwt/config.jwt";
import { UserRepository } from "src/modules/users/repository/contract/UserRepository";

@Injectable()
class CreateSessionService {
    constructor(
        private readonly userRepository: UserRepository,
        @Inject(BCryptHashPassword)
        private readonly hashpassword: IHashPasswordContract,
        private jwt: JwtService
    ) { }

    async execute({ email, password }: CreateSessionDTO) {
        try {
            const user: User = await this.userRepository.findByMail(email)
            if (!user) {
                throw new UnauthorizedException(
                    "Usuario não existe"
                )
            }

            const comparePass = await this.hashpassword.compareHash(password, user.password)

            if (!comparePass) {
                throw new UnauthorizedException(
                    "Usuario ou Senha incorretos"
                )
            }


            const token = await this.jwt.sign({
                id: user.id,
                email: user.email,
                is_enabled: user.is_enabled,
                is_admin: user.is_admin,
                is_client: user.is_client,
            })

            return {
                token,
                email: user.email,
                is_enabled: user.is_enabled,
                is_admin: user.is_admin,
                is_client: user.is_client,
            }

            
        } catch (error) {
            if (error) throw error;
            throw new InternalServerErrorException(
                'Error intern in server, please try again',
            );
        }




    }
}


export default CreateSessionService;