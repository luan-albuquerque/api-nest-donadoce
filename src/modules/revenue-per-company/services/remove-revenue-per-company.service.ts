import { Injectable, NotFoundException } from '@nestjs/common';
import { RevenuePerCompanyRepository } from '../repository/contract/RevenuePerCompanyRepository';

@Injectable()
export class RemoveRevenuePerCompanyService {
    constructor(
        private readonly revenuePerCompanyRepository: RevenuePerCompanyRepository
    ){}

    async execute(fk_revenue: string, fk_company: string){
        const revenuePerCompany = await this.revenuePerCompanyRepository.findOne(fk_revenue, fk_company)


        if (!revenuePerCompany) {
            throw new NotFoundException("não existe um cliente vinculado a está receita")
        }

        await this.revenuePerCompanyRepository.remove(fk_revenue,fk_company)
    }

}
