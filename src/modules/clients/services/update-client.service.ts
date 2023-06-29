import { HttpException, NotFoundException, HttpStatus, Injectable, Inject, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { ClientsRepository } from "src/modules/clients/repository/contract/ClientsRepository";
import { CreateClientDto } from "../dto/create-client.dto";
import IHash from "../providers/contract/IHash";
import BCryptHash from "../providers/implementations/BCryptHash";
import { UserRepository } from "src/modules/users/repository/contract/UserRepository";
import { CompanyRepository } from "src/modules/company/repository/contract/CompanyRepository";
import { ClientsCompanyRepository } from "src/modules/clients_company/repository/contract/ClientsCompanyRepository";
import { CreateClientCompany } from "src/modules/clients_company/dto/create-client-company.dto";
import { UpdateClientDto } from "../dto/update-client.dto";

@Injectable()
class UpdateClientService {
    constructor(
        private readonly clientsRepository: ClientsRepository,
        private readonly userRepository:  UserRepository,
        private readonly companyRepository:  CompanyRepository,
        @Inject(BCryptHash) private readonly hashPassword: IHash

    ) { }

    async execute(id: string,updateClientDto: UpdateClientDto) {

      const clientFindByMail = await this.userRepository.findByMail(updateClientDto.updateUserDto.email);

      if (clientFindByMail && updateClientDto.updateUserDto.email != clientFindByMail.email) {
        throw new HttpException('Email já existente', HttpStatus.CONFLICT)
      }

      const findByEmailInClient = await this.companyRepository.findByEmail(clientFindByMail.email);
      if (findByEmailInClient) {
        throw new NotFoundException(`Este email: ${clientFindByMail.email} está sendo utilizado por uma empresa.`)
      }

      const clientFindByCNPJ= await this.clientsRepository.findByCNPJ(updateClientDto.cnpj);
      const clientFindByCNPJInCompany = await this.companyRepository.findByCNPJ(updateClientDto.cnpj);
  
      if (clientFindByCNPJ && updateClientDto.cnpj != clientFindByCNPJ.cnpj || clientFindByCNPJInCompany) {
        throw new HttpException('CNPJ já existente', HttpStatus.CONFLICT)
      }
  
      const passwordHash: string = await this.hashPassword.generateHash(updateClientDto.updateUserDto.password)
  
      
      const data: UpdateClientDto = {
        name_fantasy: updateClientDto.name_fantasy,
        county: updateClientDto.county,
        district: updateClientDto.district,
        ie: updateClientDto.ie,
        uf: updateClientDto.uf,
        address: updateClientDto.address,
        cep: updateClientDto.cep,
        cnpj: updateClientDto.cnpj,
        corporate_name: updateClientDto.corporate_name,
        fone: updateClientDto.fone,
        accountable: updateClientDto.accountable,
        updateUserDto: {
          email: updateClientDto.updateUserDto.email,
          password: passwordHash,
          is_client: true,
          is_admin: false,
          is_enabled: true,
          is_driver: false,
          is_production: false
        },
      }
      

      await this.clientsRepository.update(id,data);


    }
}


export default UpdateClientService;
