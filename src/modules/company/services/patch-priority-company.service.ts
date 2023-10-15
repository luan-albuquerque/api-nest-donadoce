import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repository/contract/CompanyRepository';

@Injectable()
export class PatchPriorityCompanyService {

  constructor(
    private readonly companyRepository: CompanyRepository,
  ) { }

  async execute(id: string, priority: number) {

    const company = await this.companyRepository.findById(id)

    if (!company) {
      throw new HttpException('id não existe', HttpStatus.BAD_REQUEST)
    }

    const companyP = await this.companyRepository.findPriority(priority);

    if(companyP){
      await this.companyRepository.patchPriority(companyP.id, company.priority);
    }

    await this.companyRepository.patchPriority(company.id, priority);
  }

}
