import { HttpException, HttpStatus, Injectable, Inject, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { ClientsRepository } from "src/modules/clients/repository/contract/ClientsRepository";
import { CreateClientDto } from "../dto/create-client.dto";
import IHash from "../providers/contract/IHash";
import BCryptHash from "../providers/implementations/BCryptHash";
import { UserRepository } from "src/modules/users/repository/contract/UserRepository";

@Injectable()
class CreateClientService {
    constructor(
        private readonly clientsRepository: ClientsRepository,
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
        }
      }
      return await this.clientsRepository.create(data);
    }
}


export default CreateClientService;
