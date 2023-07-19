import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateRevenuePerClientStatusDTO } from '../dto/create-revenue-per-client.dto';
import { RevenuePerClientRepository } from '../repository/contract/RevenuePerClientRepository';

@Injectable()
export class CreateRevenuePerClientService {

    constructor(
        private readonly revenuePerClientRepository: RevenuePerClientRepository
    ) { }

    async execute({ fk_client, fk_revenue, unique_value }: CreateRevenuePerClientStatusDTO) {

        const revenuePerCompany = await this.revenuePerClientRepository.findOne(fk_revenue, fk_client)


        if (revenuePerCompany) {
            throw new BadRequestException("Ja existe um cliente vinculado a está receita")
        }

        await this.revenuePerClientRepository.create({
            fk_client,
            fk_revenue,
            unique_value
        })

    }
}
