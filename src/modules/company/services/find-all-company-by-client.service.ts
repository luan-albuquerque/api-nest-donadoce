import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyRepository } from '../repository/contract/CompanyRepository';
import { ClientsRepository } from 'src/modules/clients/repository/contract/ClientsRepository';
import { ClientsCompanyRepository } from 'src/modules/clients_company/repository/contract/ClientsCompanyRepository';

@Injectable()
export class FindAllCompanyByClientService {

  constructor(
    private readonly clientsCompanyRepository: ClientsCompanyRepository,
  ){}

  async execute(fk_user: string) {
     
    return await this.clientsCompanyRepository.findOneByClient(fk_user);

  }

}
