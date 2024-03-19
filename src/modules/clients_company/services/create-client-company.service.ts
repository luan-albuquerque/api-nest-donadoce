import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ClientsCompanyRepository } from "../repository/contract/ClientsCompanyRepository";
import { ClientsRepository } from "src/modules/clients/repository/contract/ClientsRepository";
import { CompanyRepository } from "src/modules/company/repository/contract/CompanyRepository";
import { CreateClientCompany } from "../dto/create-client-company.dto";
import { UserRepository } from "src/modules/users/repository/contract/UserRepository";
import BCryptHash from "src/modules/users/providers/implementations/BCryptHash";
import IHash from "src/modules/users/providers/contract/IHash";
import { User } from "src/modules/users/entities/user.entity";

@Injectable()
class CreateClientCompanyService {
  constructor(
    private readonly clientsCompanyRepository: ClientsCompanyRepository,
    private readonly clientsRepository: ClientsRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository,
    @Inject(BCryptHash) private readonly hashPassword: IHash
  ) { }


  async execute(data: CreateClientCompany[]) {
    await Promise.all(
      data.map(async (item) => {
        const company = await this.companyRepository.findById(item.fk_company);
        if (!company) {
          throw new NotFoundException("Empresa não encontrado")
        }

        const client = await this.clientsRepository.findById(item.fk_client);
        if (!client) {
          throw new NotFoundException("Cliente não encontrado.")
        }


        const findByFoneInClient = await this.clientsRepository.findByFone(item.fone);
        if (findByFoneInClient) {
          throw new NotFoundException("Fone Cliente já cadastrado")
        }

        const userFindByMail = await this.userRepository.findByMail(item.user.email);

        if (userFindByMail) {
          throw new HttpException('Email já existente', HttpStatus.CONFLICT)
        }

        const passwordHash: string = await this.hashPassword.generateHash(item.user.password)

        item.user.password = passwordHash;
        item.user.is_admin = false;
        item.user.is_client = false;
        item.user.is_driver = false;
        item.user.is_enabled = true;
        item.user.is_production = false;
        item.user.is_company = true;

        await this.userRepository.create(item.user).then(async (user: User) => {
          await this.clientsCompanyRepository.createOne(
            item.accountable,
            item.fone,
            item.fk_client,
            item.fk_company,
            user.id,
          )
        }).catch((error)=> {
          throw new HttpException('Não foi possivel realizar vinculo', HttpStatus.BAD_REQUEST)

        })



      }))

  }
}

export default CreateClientCompanyService;
