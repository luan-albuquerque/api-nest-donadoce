import { Injectable } from '@nestjs/common';
import { RevenuesRepository } from '../repository/contract/RevenuesRepository';
import { FiltersRevenueDTO } from '../dto/filters-revenue.dto';

@Injectable()
export class FindAllRevenueService {

    constructor(
        private readonly revenuesRepository: RevenuesRepository,
    ) { }

    async execute({ description, skip, take }: FiltersRevenueDTO){
        return await this.revenuesRepository.findByAll({ description, skip, take })
    }

}
