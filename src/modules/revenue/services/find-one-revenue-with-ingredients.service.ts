import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RevenuesRepository } from '../repository/contract/RevenuesRepository';

@Injectable()
export class FindOneRevenueWithIngredientService {
    constructor(
        private readonly revenuesRepository: RevenuesRepository,
    ) { }



    async execute(id: string) {

        const revenue = await this.revenuesRepository.findByOne(id)

        if (!revenue) {
            throw new UnauthorizedException("Receita não encontrada")
        }

        return await this.revenuesRepository.findByOneWithIngredients(id)
    }
}
