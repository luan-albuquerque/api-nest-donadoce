import { Injectable, NotFoundException } from '@nestjs/common';
import { RevenuePerClientRepository } from '../repository/contract/RevenuePerClientRepository';

@Injectable()
export class RemoveRevenuePerClientService {
    constructor(
        private readonly revenuePerClientRepository: RevenuePerClientRepository
    ) { }

    async execute(fk_revenue: string, fk_client: string){
        const revenuePerCompany = await this.revenuePerClientRepository.findOne(fk_revenue, fk_client)


        if (!revenuePerCompany) {
            throw new NotFoundException("não existe um cliente vinculado a está receita")
        }

        await this.revenuePerClientRepository.remove(fk_revenue,fk_client)
    }

}
