import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyRepository } from '../repository/contract/CompanyRepository';
import { ClientsRepository } from 'src/modules/clients/repository/contract/ClientsRepository';

@Injectable()
export class CreateCompanyService {

  constructor(
    private readonly companyRepository: CompanyRepository,
  ){}

  async execute(createCompanyDto: CreateCompanyDto) {
     

    const create: CreateCompanyDto = {
      corporate_name: createCompanyDto.corporate_name,
      address: createCompanyDto.address,
      cep: createCompanyDto.cep,
      cnpj: createCompanyDto.cnpj,
      county: createCompanyDto.cep,
      email: createCompanyDto.email,
      accountable: createCompanyDto.accountable,
      district: createCompanyDto.district,
      ie: createCompanyDto.ie,
      uf: createCompanyDto.uf,
    }


    await this.companyRepository.create(create)



  }

}
