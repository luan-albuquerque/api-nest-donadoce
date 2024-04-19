import { HttpException, HttpStatus, Injectable, Inject, InternalServerErrorException, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { ClientsRepository } from "src/modules/clients/repository/contract/ClientsRepository";
import { CreateClientDto } from "../dto/create-client.dto";
import IHash from "../providers/contract/IHash";
import BCryptHash from "../providers/implementations/BCryptHash";
import { UserRepository } from "src/modules/users/repository/contract/UserRepository";
import { CompanyRepository } from "src/modules/company/repository/contract/CompanyRepository";
import { ClientsCompanyRepository } from "src/modules/clients_company/repository/contract/ClientsCompanyRepository";
import { CreateClientCompany } from "src/modules/clients_company/dto/create-client-company.dto";
import { User } from "src/modules/users/entities/user.entity";

@Injectable()
class CreateClientService {
  constructor(
    private readonly clientsRepository: ClientsRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly clientsCompanyRepository: ClientsCompanyRepository,
    private readonly userRepository: UserRepository,
    @Inject(BCryptHash) private readonly hashPassword: IHash

  ) { }

  async execute(createClientDto: CreateClientDto) {

  
    createClientDto.corporate_name = createClientDto.corporate_name.toUpperCase();

    const clientFindByMail = await this.userRepository.findByMail(createClientDto.createUser.email);

    if (clientFindByMail) {
      throw new HttpException('Email já existente', HttpStatus.CONFLICT)
    }

    const clientFindByCNPJ = await this.clientsRepository.findByCNPJ(createClientDto.cnpj);


    const passwordHash: string = await this.hashPassword.generateHash(createClientDto.createUser.password)

    if (createClientDto.createCompany) {
      await Promise.all(
      createClientDto.createCompany.map(async (item) => {

        const company = await this.companyRepository.findById(item.fk_company)

        if (!company) {
          throw new HttpException('Company inexistente', HttpStatus.CONFLICT)
        }


        const emailClient = await this.userRepository.findByMail(item.user.email);
        if (emailClient) {
          throw new NotFoundException(`${item.user.email} já cadastrado`)
        }

      })
      );
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
        is_driver: false,
        is_production: false
      },
      createCompany: null // Save in code button
    }

    const newClient = await this.clientsRepository.create(data);
    
    console.log({newClient});
    const newData: CreateClientCompany[] = []    

    if (createClientDto.createCompany) {
      await Promise.all(
        createClientDto.createCompany.map(async (item) => {
          console.log({item: item});

          const passwordHash: string = await this.hashPassword.generateHash(item.user.password)

          item.user.email = item.user.email;
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
              newClient.id,
              item.fk_company,
              user.id,
            )
          }).catch((error)=> {
            throw new HttpException('Não foi possivel realizar vinculo', HttpStatus.BAD_REQUEST)
  
          })


        })
      )
    }



  }
}


export default CreateClientService;
