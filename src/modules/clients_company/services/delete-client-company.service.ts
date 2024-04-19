import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ClientsCompanyRepository } from "../repository/contract/ClientsCompanyRepository";
import { ClientsRepository } from "src/modules/clients/repository/contract/ClientsRepository";
import { CompanyRepository } from "src/modules/company/repository/contract/CompanyRepository";
import { DeleteClientCompany } from "../dto/delete-client-company.dto";

@Injectable()
export class DeleteClientCompanyService {
    constructor(
        private readonly clientsCompanyRepository: ClientsCompanyRepository,
        private readonly clientsRepository: ClientsRepository,
        private readonly companyRepository: CompanyRepository,
    ) { }

    async execute({fk_client, fk_company}: DeleteClientCompany) {    
      const company = await this.companyRepository.findById(fk_company);
      if(!company){
        throw new NotFoundException("Company not found")
      } 

      const client = await this.clientsRepository.findById(fk_client);
      if(!client){
        throw new NotFoundException("Client not found")
      } 
      return await this.clientsCompanyRepository.remove(fk_client,fk_company)
    }
}


