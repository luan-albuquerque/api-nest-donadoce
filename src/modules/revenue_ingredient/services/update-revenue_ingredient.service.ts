import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IngredientsRepository } from 'src/modules/ingredients/repository/contract/IngredientsRepository';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { RevenuesIngredientsRepository } from '../repository/contract/RevenuesIngredientsRepository';
import { UpdateRevenueIngredientDto } from '../dto/update-revenue_ingredient.dto';

@Injectable()
export class UpdateRevenueIngredientService {

    constructor(
        private readonly revenuesRepository: RevenuesRepository,
        private readonly revenuesIngredientsRepository: RevenuesIngredientsRepository,
    ) { }
    async execute(updateRevenueIngredientDto: UpdateRevenueIngredientDto) {

        const revenue = await this.revenuesRepository.findByOne(updateRevenueIngredientDto.fk_revenues)

        if (!revenue) {
            throw new UnauthorizedException("Receita não existente")
        }
        const ingredientAllExistInRevenue = await this.revenuesIngredientsRepository.findOneIngredient(updateRevenueIngredientDto.fk_ingredient)

        if (!ingredientAllExistInRevenue) {
            throw new UnauthorizedException("Ingrediente não existente em receita")

        }

        await this.revenuesIngredientsRepository.update(updateRevenueIngredientDto)
    }
}
