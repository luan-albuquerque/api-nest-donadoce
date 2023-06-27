import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ClientsCompanyRepository } from "../repository/contract/ClientsCompanyRepository";
import { ClientsRepository } from "src/modules/clients/repository/contract/ClientsRepository";
import { CompanyRepository } from "src/modules/company/repository/contract/CompanyRepository";
import { CreateClientCompany } from "../dto/create-client-company.dto";

@Injectable()
class CreateClientCompanyService {
    constructor(
        private readonly clientsCompanyRepository: ClientsCompanyRepository,
        private readonly clientsRepository: ClientsRepository,
        private readonly companyRepository: CompanyRepository,
    ) { }

    async execute(data: CreateClientCompany[]) { 
      await Promise.all(   
      data.map(async (item)=>{
      const company = await this.companyRepository.findById(item.fk_company);
      if(!company){
        throw new NotFoundException("Company not found")
      } 

      const client = await this.clientsRepository.findById(item.fk_client);
      if(!client){
        throw new NotFoundException("Client not found")
      } 
  }))
  await this.clientsCompanyRepository.create(data)  
 }
}

export default CreateClientCompanyService;
