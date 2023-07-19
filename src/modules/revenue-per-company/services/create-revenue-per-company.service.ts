import { Injectable, BadRequestException } from '@nestjs/common';
import { RevenuePerCompanyRepository } from '../repository/contract/RevenuePerCompanyRepository';
import { CreateRevenuePerCompanyStatusDTO } from '../dto/create-revenue-per-company.dto';

@Injectable()
export class CreateRevenuePerCompanyService {

    constructor(
        private readonly revenuePerCompanyRepository: RevenuePerCompanyRepository
    ) { }

    async execute({ fk_company, fk_revenue, unique_value }: CreateRevenuePerCompanyStatusDTO) {

        const revenuePerCompany = await this.revenuePerCompanyRepository.findOne(fk_revenue, fk_company)


        if (revenuePerCompany) {
            throw new BadRequestException("Ja existe um cliente vinculado a está receita")
        }

        await this.revenuePerCompanyRepository.create({
            fk_company,
            fk_revenue,
            unique_value
        })

    }
}
