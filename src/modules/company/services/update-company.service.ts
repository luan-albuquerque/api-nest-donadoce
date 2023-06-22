import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyRepository } from '../repository/contract/CompanyRepository';
import { ClientsRepository } from 'src/modules/clients/repository/contract/ClientsRepository';

@Injectable()
export class UpdateCompanyService {

  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly clientsRepository: ClientsRepository
  ){}

  async execute(id: string, updateCompanyDto: UpdateCompanyDto) {
 
  
    const company = await this.companyRepository.findById(id)

    if (!company) {
      throw new HttpException('id não existe', HttpStatus.CONFLICT)
    }


  
    const create: UpdateCompanyDto = {
      corporate_name: updateCompanyDto.corporate_name,
      address: updateCompanyDto.address,
      cep: updateCompanyDto.cep,
      cnpj: updateCompanyDto.cnpj,
      email: updateCompanyDto.email,
      accountable: updateCompanyDto.accountable,
      district: updateCompanyDto.district,
      ie: updateCompanyDto.ie,
      uf: updateCompanyDto.uf,
      county: updateCompanyDto.county
    }


    await this.companyRepository.update(id, create)



  }

}
