import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import BCryptHashPassword from "../../auth/providers/Hash/implementations/BCryptHashPassword";
import CreateSessionDTO from "../../auth/dtos/CreateSessionDTO";
import { User } from "src/modules/users/entities/user.entity";
import { ClientsRepository } from "src/modules/clients/repository/contract/ClientsRepository";
import { Client } from "src/modules/clients/entities/client.entity";
import { PaginationOptions } from "../dto/pagination-options.dto";

@Injectable()
class FindAllClientService {
    constructor(
        private readonly clientsRepository: ClientsRepository,
    ) { }

    async execute(page?: PaginationOptions) {
     
      return await this.clientsRepository.findByAll(page);
    }
}


export default FindAllClientService;
