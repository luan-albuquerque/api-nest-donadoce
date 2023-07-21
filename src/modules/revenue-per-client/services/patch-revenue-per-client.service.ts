import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRevenuePerClientStatusDTO } from '../dto/update-revenue-per-client-status.dto';
import { RevenuePerClientRepository } from '../repository/contract/RevenuePerClientRepository';

@Injectable()
export class PatchRevenuePerClientService {
    constructor(
        private readonly revenuePerClientRepository: RevenuePerClientRepository
    ) { }

    async execute({fk_client,fk_revenue,unique_value}: UpdateRevenuePerClientStatusDTO){

        const revenuePerCompany = await this.revenuePerClientRepository.findOne(fk_revenue, fk_client)

        if (!revenuePerCompany) {
            throw new NotFoundException("não existe um cliente vinculado a está receita")
        }

        await this.revenuePerClientRepository.patchStatus({
            fk_client,
            fk_revenue,
            unique_value
        })
    }

}
