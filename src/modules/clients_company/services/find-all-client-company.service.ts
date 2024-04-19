import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import BCryptHashPassword from "../../auth/providers/Hash/implementations/BCryptHashPassword";
import CreateSessionDTO from "../../auth/dtos/CreateSessionDTO";
import { User } from "src/modules/users/entities/user.entity";
import { ClientsRepository } from "src/modules/clients/repository/contract/ClientsRepository";
import { Client } from "src/modules/clients/entities/client.entity";
import { ClientsCompanyRepository } from "../repository/contract/ClientsCompanyRepository";
import { PaginationOptions } from "../dto/pagination-options.dto";

@Injectable()
class FindAllClientCompanyService {
    constructor(
        private readonly clientsCompanyRepository: ClientsCompanyRepository,
    ) { }

    async execute(page: PaginationOptions) {
     
      return await this.clientsCompanyRepository.findAll(page);
    }
}


export default FindAllClientCompanyService;
