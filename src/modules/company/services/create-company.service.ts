import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyRepository } from '../repository/contract/CompanyRepository';
import { ClientsRepository } from 'src/modules/clients/repository/contract/ClientsRepository';
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';

@Injectable()
export class CreateCompanyService {

  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly clientsRepository: ClientsRepository,
    private readonly userRepository: UserRepository,
  ) { }

  async execute(createCompanyDto: CreateCompanyDto) {

    createCompanyDto.corporate_name = createCompanyDto.corporate_name.toUpperCase();


    const create: CreateCompanyDto = {
      corporate_name: createCompanyDto.corporate_name,
      address: createCompanyDto.address,
      cep: createCompanyDto.cep,
      cnpj: createCompanyDto.cnpj,
      county: createCompanyDto.cep,
      district: createCompanyDto.district,
      uf: createCompanyDto.uf,
    }


    await this.companyRepository.create(create)



  }

}
