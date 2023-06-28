import { HttpException, HttpStatus, Injectable, Inject, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { ClientsRepository } from "src/modules/clients/repository/contract/ClientsRepository";
import { CreateClientDto } from "../dto/create-client.dto";
import IHash from "../providers/contract/IHash";
import BCryptHash from "../providers/implementations/BCryptHash";
import { UserRepository } from "src/modules/users/repository/contract/UserRepository";
import { CompanyRepository } from "src/modules/company/repository/contract/CompanyRepository";
import { ClientsCompanyRepository } from "src/modules/clients_company/repository/contract/ClientsCompanyRepository";
import { CreateClientCompany } from "src/modules/clients_company/dto/create-client-company.dto";

@Injectable()
class DeleteClientService {
    constructor(
        private readonly clientsRepository: ClientsRepository,
        private readonly clientsCompanyRepository: ClientsCompanyRepository,
        private readonly userRepository:  UserRepository

    ) { }

    async execute(id: string) {
     
    const client = await this.clientsRepository.findById(id);
    if (!client) {
        throw new UnauthorizedException("Cliente não encontrado")
    }
     

    await this.clientsCompanyRepository.removeAll(id).then(async ()=>{
         await this.clientsRepository.remove(id)
         await this.userRepository.remove(id)
    })

     


    }
}


export default DeleteClientService;
