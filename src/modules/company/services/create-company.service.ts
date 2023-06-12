import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyRepository } from '../repository/contract/CompanyRepository';
import { ClientsRepository } from 'src/modules/clients/repository/contract/ClientsRepository';

@Injectable()
export class CreateCompanyService {

  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly clientsRepository: ClientsRepository
  ){}

  async execute(createCompanyDto: CreateCompanyDto) {
     

    const client = await this.clientsRepository.findById(createCompanyDto.fk_clients)

    if (!client) {
      throw new HttpException('Cliente não existe', HttpStatus.CONFLICT)
    }



    const findByCNPJByClient = await this.companyRepository.findByCNPJByClient(createCompanyDto.cnpj, createCompanyDto.fk_clients)
    
    if (findByCNPJByClient) {
      throw new HttpException(`CNPJ de Empresa já existe e esta atrelado ao Cliente ${client.corporate_name}`, HttpStatus.CONFLICT)
    }

    const findByEmailByClient = await this.companyRepository.findByEmailByClient(createCompanyDto.email, createCompanyDto.fk_clients)

    if (findByEmailByClient) {
      throw new HttpException(`Email de Empresa já existe e esta atrelado ao Cliente ${client.corporate_name}`, HttpStatus.CONFLICT)
    }

    const create: CreateCompanyDto = {
      corporate_name: createCompanyDto.corporate_name,
      address: createCompanyDto.address,
      cep: createCompanyDto.cep,
      cnpj: createCompanyDto.cnpj,
      fk_clients: createCompanyDto.fk_clients,
      fone: createCompanyDto.fone,
      email: createCompanyDto.email,
    }


    await this.companyRepository.create(create)



  }

}
