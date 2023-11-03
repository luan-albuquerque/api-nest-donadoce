import { Injectable } from '@nestjs/common';
import { RevenuesRepository } from '../repository/contract/RevenuesRepository';
import { FiltersRevenueDTO } from '../dto/filters-revenue.dto';

@Injectable()
export class FindAllRevenuesNotMenuService{

    constructor(
        private readonly revenuesRepository: RevenuesRepository,
    ) { }

    async execute(fk_menu: string) {

        return  await this.revenuesRepository.findByAllNotMenu(fk_menu);
    }

}
