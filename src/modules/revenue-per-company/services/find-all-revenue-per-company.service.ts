import { Injectable } from '@nestjs/common';
import { RevenuePerCompanyRepository } from '../repository/contract/RevenuePerCompanyRepository';
import { FiltersRevenuePerCompanyDTO } from '../dto/filters-revenue-per-company.dto';

@Injectable()
export class FindAllRevenuePerCompanyService {
    constructor(
        private readonly revenuePerCompanyRepository: RevenuePerCompanyRepository
    ){}

    async execute(data: FiltersRevenuePerCompanyDTO){

        return await this.revenuePerCompanyRepository.findAll(data);

    }

}
