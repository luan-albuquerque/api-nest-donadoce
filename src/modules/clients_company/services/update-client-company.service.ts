import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ClientsCompanyRepository } from "../repository/contract/ClientsCompanyRepository";
import { ClientsRepository } from "src/modules/clients/repository/contract/ClientsRepository";
import { CompanyRepository } from "src/modules/company/repository/contract/CompanyRepository";
import { CreateClientCompany } from "../dto/create-client-company.dto";
import { UserRepository } from "src/modules/users/repository/contract/UserRepository";
import BCryptHash from "src/modules/users/providers/implementations/BCryptHash";
import IHash from "src/modules/users/providers/contract/IHash";
import { User } from "src/modules/users/entities/user.entity";
import { UpdateClientCompany } from "../dto/update-client-company.dto";

@Injectable()
class UpdateClientCompanyService {
  constructor(
    private readonly clientsCompanyRepository: ClientsCompanyRepository,
    private readonly clientsRepository: ClientsRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository,
    @Inject(BCryptHash) private readonly hashPassword: IHash
  ) { }


  async execute(data: UpdateClientCompany) {

    
 
        const company = await this.companyRepository.findById(data.fk_company);
        if (!company) {
          throw new NotFoundException("Empresa não encontrado")
        }

        const client = await this.clientsRepository.findById(data.fk_client);
        if (!client) {
          throw new NotFoundException("Cliente não encontrado.")
        }


        const findByFoneInClient = await this.clientsRepository.findByFone(data.fone);
        if (findByFoneInClient) {
          throw new NotFoundException("Fone Cliente já cadastrado")
        }

        const userFindByMail = await this.userRepository.findByMail(data.user.email);

        if (userFindByMail) {
          throw new HttpException('Email já existente', HttpStatus.CONFLICT)
        }

        const userClientCopany = await this.clientsCompanyRepository.findOneByClientAndCompany(data.fk_client, data.fk_company);
   

        if(!userClientCopany){
          throw new HttpException('Vinculo de cliente e unidade inexistente.', HttpStatus.NOT_FOUND)
        }
        const passwordHash: string = await this.hashPassword.generateHash(data.user.password)

        data.user.password = passwordHash;
        data.user.is_admin = false;
        data.user.is_client = false;
        data.user.is_driver = false;
        data.user.is_enabled = true;
        data.user.is_production = false;
        data.user.is_company = true;
         

        // if(userClientCopany.fk_client == data.fk_client){
        //   throw new HttpException('Sua Unidade já esta vinculado a esse cliente.', HttpStatus.BAD_REQUEST)
        // }

        // if(userClientCopany.fk_company == data.fk_company){
        //   throw new HttpException('Seu cliente já esta vinculado a essa unidade.', HttpStatus.BAD_REQUEST)
          
        // }
        await this.clientsCompanyRepository.update(
          {
            accountable: data.accountable,
            fk_client: data.fk_client,
            fk_company: data.fk_company,
            fone: data.fone,
          }
          )


        await this.userRepository.update(userClientCopany.fk_user, data.user);


  }
}

export default UpdateClientCompanyService;
