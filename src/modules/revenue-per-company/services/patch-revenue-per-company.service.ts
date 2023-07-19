import { Injectable, NotFoundException } from '@nestjs/common';
import { RevenuePerCompanyRepository } from '../repository/contract/RevenuePerCompanyRepository';
import { UpdateRevenuePerCompanyStatusDTO } from '../dto/update-revenue-per-company-status.dto';

@Injectable()
export class PatchRevenuePerCompanyService {
    constructor(
        private readonly revenuePerCompanyRepository: RevenuePerCompanyRepository
    ){}

    async execute({fk_company,fk_revenue,unique_value}: UpdateRevenuePerCompanyStatusDTO){

        const revenuePerCompany = await this.revenuePerCompanyRepository.findOne(fk_revenue, fk_company)

        if (!revenuePerCompany) {
            throw new NotFoundException("não existe um cliente vinculado a está receita")
        }

        await this.revenuePerCompanyRepository.patchStatus({
            fk_company,
            fk_revenue,
            unique_value
        })
    }

}
