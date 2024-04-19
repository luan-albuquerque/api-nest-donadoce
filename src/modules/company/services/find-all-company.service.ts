import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyRepository } from '../repository/contract/CompanyRepository';
import { ClientsRepository } from 'src/modules/clients/repository/contract/ClientsRepository';

@Injectable()
export class FindAllCompanyService {

  constructor(
    private readonly companyRepository: CompanyRepository,
  ){}

  async execute() {
     
    return await this.companyRepository.findAll()

  }

}
