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
class CreateClientService {
    constructor(
        private readonly clientsRepository: ClientsRepository,
        private readonly companyRepository : CompanyRepository,
        private readonly clientsCompanyRepository: ClientsCompanyRepository,
        private readonly userRepository:  UserRepository,
        @Inject(BCryptHash) private readonly hashPassword: IHash

    ) { }

    async execute(createClientDto: CreateClientDto) {

      const clientFindByMail = await this.userRepository.findByMail(createClientDto.createUser.email);

      if (clientFindByMail) {
        throw new HttpException('Email já existente', HttpStatus.CONFLICT)
      }

      const clientFindByCNPJ= await this.clientsRepository.findByCNPJ(createClientDto.cnpj);

  
      if (clientFindByCNPJ) {
        throw new HttpException('CNPJ já existente', HttpStatus.CONFLICT)
      }
  
      const passwordHash: string = await this.hashPassword.generateHash(createClientDto.createUser.password)
  
      if(createClientDto.createCompany){
        createClientDto.createCompany.map((item)=>{
           
            const company = this.companyRepository.findById( item.fk_company)

            if (!company) {
              throw new HttpException('Company inexistente', HttpStatus.CONFLICT)
            }
        })
      }


      
      const data: CreateClientDto = {
        name_fantasy: createClientDto.name_fantasy,
        county: createClientDto.county,
        district: createClientDto.district,
        ie: createClientDto.ie,
        uf: createClientDto.uf,
        address: createClientDto.address,
        cep: createClientDto.cep,
        cnpj: createClientDto.cnpj,
        corporate_name: createClientDto.corporate_name,
        fone: createClientDto.fone,
        accountable: createClientDto.accountable,
        createUser: {
          email: createClientDto.createUser.email,
          password: passwordHash,
          is_client: true,
          is_admin: false,
          is_enabled: true,
        },
        createCompany: null // Save in code button
      }
      
      const newClient = await this.clientsRepository.create(data);

      const newData: CreateClientCompany[] = []
      
      if(createClientDto.createCompany){
        Promise.all(
        createClientDto.createCompany.map((item)=>{
          newData.push(
            {
              accountable: item.accountable,
              fk_client: newClient.id,
              fk_company: item.fk_company,
              fone:item.fone
            }
          )
        
          
        })
        )
        await this.clientsCompanyRepository.create(newData)
      }



    }
}


export default CreateClientService;
