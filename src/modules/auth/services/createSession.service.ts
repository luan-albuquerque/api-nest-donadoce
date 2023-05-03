import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import BCryptHashPassword from "../providers/Hash/implementations/BCryptHashPassword";
import { UserRepository } from "src/modules/users/repository/UserRepository";
import CreateSessionDTO from "../dtos/CreateSessionDTO";
import { User } from "src/modules/users/entities/user.entity";

@Injectable()
class CreateSessionService {
    constructor(
        private readonly userRepository: UserRepository,
        @Inject(BCryptHashPassword)
        private readonly hashpassword: IHashPasswordContract,
        private jtw: JwtService
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


            return this.jtw.sign({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email
            })
        } catch (error) {
            if (error) throw error;
            throw new InternalServerErrorException(
                'Error intern in server, please try again',
            );
        }




    }
}


export default CreateSessionService;