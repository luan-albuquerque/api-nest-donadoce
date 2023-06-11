import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import BCryptHashPassword from "../../auth/providers/Hash/implementations/BCryptHashPassword";
import CreateSessionDTO from "../../auth/dtos/CreateSessionDTO";
import { User } from "src/modules/users/entities/user.entity";
import { ClientsRepository } from "src/modules/clients/repository/contract/ClientsRepository";
import { Client } from "src/modules/clients/entities/client.entity";

@Injectable()
class CreateSessionClientService {
    constructor(
        private readonly clientsRepository: ClientsRepository,
        @Inject(BCryptHashPassword)
        private readonly hashpassword: IHashPasswordContract,
        private jwt: JwtService
    ) { }

    async execute({ email, password }: CreateSessionDTO) {
        try {
            const client: Client = await this.clientsRepository.findByMail(email)
            if (!client) {
                throw new UnauthorizedException(
                    "Cliente não existe"
                )
            }

            const comparePass = await this.hashpassword.compareHash(password, client.password)

            if (!comparePass) {
                throw new UnauthorizedException(
                    "Usuario ou Senha incorretos"
                )
            }


            return await this.jwt.sign({
                id: client.id,
                corporate_name: client.corporate_name,
                cnpj: client.cnpj,
                // username: user.username,
                email: client.email,
                is_enabled: client.is_enabled,

            })
        } catch (error) {
            if (error) throw error;
            throw new InternalServerErrorException(
                'Error intern in server, please try again',
            );
        }




    }
}


export default CreateSessionClientService;
