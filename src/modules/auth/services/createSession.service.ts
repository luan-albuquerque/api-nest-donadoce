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
        private readonly jwt: JwtService
    ) { }

    async execute({ email, password }: CreateSessionDTO) {
        try {
            const user = await this.userRepository.findByMail(email);
            if (!user) {
                throw new UnauthorizedException("Usuário não encontrado.");
            }

            const isPasswordValid = await this.hashpassword.compareHash(password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException("Senha incorreta.");
            }

            delete user.password;
            
            const token = this.jwt.sign(user);

            return {
                token,
                ...user,
            };
        } catch (error) {
            throw new InternalServerErrorException('Erro interno no servidor. Por favor, tente novamente mais tarde.');
        }
    }
}

export default CreateSessionService;
