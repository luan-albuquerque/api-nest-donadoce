import { HttpException, HttpStatus, Injectable, Inject, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { ClientsRepository } from "src/modules/clients/repository/contract/ClientsRepository";
import { CreateClientDto } from "../dto/create-client.dto";
import IHash from "../providers/contract/IHash";
import BCryptHash from "../providers/implementations/BCryptHash";

@Injectable()
class CreateClientService {
    constructor(
        private readonly clientsRepository: ClientsRepository,
        @Inject(BCryptHash) private readonly hashPassword: IHash

    ) { }

    async execute(createClientDto: CreateClientDto) {

      const clientFindByMail = await this.clientsRepository.findByMail(createClientDto.email);

      if (clientFindByMail) {
        throw new HttpException('Email já existente', HttpStatus.CONFLICT)
      }

      const clientFindByCNPJ= await this.clientsRepository.findByCNPJ(createClientDto.cnpj);

  
      if (clientFindByCNPJ) {
        throw new HttpException('CNPJ já existente', HttpStatus.CONFLICT)
      }
  
      const passwordHash: string = await this.hashPassword.generateHash(createClientDto.password)
  
      const data: CreateClientDto = {
        email: createClientDto.email,
        address: createClientDto.address,
        cep: createClientDto.cep,
        cnpj: createClientDto.cnpj,
        corporate_name: createClientDto.corporate_name,
        password: passwordHash,
        fone: createClientDto.fone,
      }
      return await this.clientsRepository.create(data);
    }
}


export default CreateClientService;
