import { Injectable } from '@nestjs/common';
import { RevenuesRepository } from '../repository/contract/RevenuesRepository';
import { FiltersRevenueDTO } from '../dto/filters-revenue.dto';

@Injectable()
export class FindAllRevenuesSummarizedService {

    constructor(
        private readonly revenuesRepository: RevenuesRepository,
    ) { }

    async execute({ description, skip, take }: FiltersRevenueDTO) {
        return await this.revenuesRepository.findByAllSummarized(
            {
                description,
                skip,
                take
            }
        )
    }

}
