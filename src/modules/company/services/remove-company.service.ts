import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repository/contract/CompanyRepository';

@Injectable()
export class RemoveCompanyService {

  constructor(
    private readonly companyRepository: CompanyRepository,
  ) { }

  async execute(id: string) {

    const company = await this.companyRepository.findById(id)

    if (!company) {
      throw new HttpException('id não existe', HttpStatus.CONFLICT)
    }

    await this.companyRepository.remove(id)
  }

}
