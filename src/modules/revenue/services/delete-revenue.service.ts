import { Injectable } from '@nestjs/common';
import { RevenuesRepository } from '../repository/contract/RevenuesRepository';
import { RevenuesIngredientsRepository } from 'src/modules/revenue_ingredient/repository/contract/RevenuesIngredientsRepository';

@Injectable()
export class DeleteRevenueService {
    
    constructor(
        private readonly revenuesRepository: RevenuesRepository,
        private readonly revenuesIngredientsRepository: RevenuesIngredientsRepository,
    ) { }

    async execute(id: string) {
        await this.revenuesIngredientsRepository.removeAllByRevenue(id).then(async ()=>{
            await this.revenuesRepository.remove(id)
        })
        
    }
}
