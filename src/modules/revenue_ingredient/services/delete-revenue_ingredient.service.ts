import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IngredientsRepository } from 'src/modules/ingredients/repository/contract/IngredientsRepository';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { RevenuesIngredientsRepository } from '../repository/contract/RevenuesIngredientsRepository';
import { DeleteRevenueIngredientDto } from '../dto/delete-revenue_ingredient.dto';

@Injectable()
export class DeleteRevenueIngredientService {
    constructor(
        private readonly ingredientsRepository: IngredientsRepository,
        private readonly revenuesRepository: RevenuesRepository,
        private readonly revenuesIngredientsRepository: RevenuesIngredientsRepository,
    ) { }
    async execute(data: DeleteRevenueIngredientDto) {

        const revenue = await this.revenuesRepository.findByOne(data.fk_revenues)

        if (!revenue) {
            throw new UnauthorizedException("Receita não existente")
        }
        const ingredientAllExistInRevenue = await this.revenuesIngredientsRepository.findOneIngredient(data.fk_ingredient)

        if (!ingredientAllExistInRevenue) {
            throw new UnauthorizedException("Ingrediente não existente em receita")

        }

        await this.revenuesIngredientsRepository.remove(data.fk_ingredient, data.fk_revenues)
    }
}
