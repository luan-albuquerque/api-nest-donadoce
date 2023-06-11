import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import BCryptHashPassword from "../../auth/providers/Hash/implementations/BCryptHashPassword";
import CreateSessionDTO from "../../auth/dtos/CreateSessionDTO";
import { User } from "src/modules/users/entities/user.entity";
import { ClientsRepository } from "src/modules/clients/repository/contract/ClientsRepository";
import { Client } from "src/modules/clients/entities/client.entity";

@Injectable()
class FindOneClientService {
    constructor(
        private readonly clientsRepository: ClientsRepository,
    ) { }

    async execute(id: string) {
      const client = await this.clientsRepository.findById(id);
      if (!client) {
        throw new UnauthorizedException("Cliente não encontrado")
    }

      return client
    }
}


export default FindOneClientService;
