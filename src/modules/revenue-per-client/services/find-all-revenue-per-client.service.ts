import { Injectable } from '@nestjs/common';
import { RevenuePerClientRepository } from '../repository/contract/RevenuePerClientRepository';
import { FiltersRevenuePerClientDTO } from '../dto/filters-revenue-per-client.dto';

@Injectable()
export class FindAllRevenuePerClientService {
    constructor(
        private readonly revenuePerClientRepository: RevenuePerClientRepository
    ) { }

    async execute(data: FiltersRevenuePerClientDTO){

        return await this.revenuePerClientRepository.findAll(data);

    }

}
