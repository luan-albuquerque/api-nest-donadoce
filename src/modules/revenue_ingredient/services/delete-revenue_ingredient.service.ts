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
        const ingredientAllExistInRevenue = await this.revenuesIngredientsRepository.findOneIngredient(data.fk_ingredient, data.fk_revenues)
        if (!ingredientAllExistInRevenue) {
            throw new UnauthorizedException("Ingrediente não existente em receita")

        }
        const value_defined_by_revenue = revenue.value_defined_by_revenue - (ingredientAllExistInRevenue.ingredients.value_per_serving * ingredientAllExistInRevenue.amount_ingredient);

        await this.revenuesIngredientsRepository.remove(data.fk_ingredient, data.fk_revenues).then(async ()=>{
            await this.revenuesRepository.update(revenue.id, {
                description: revenue.description,
                status: revenue.order_type == "programmed" ? 1 : 0,
                order_type: revenue.order_type,
                value: revenue.value,
                imagem: revenue.imagem,
                base_max_amount: revenue.base_max_amount,
                base_min_amount: revenue.base_min_amount,
                old_imagem: null,
                presumed_profit: revenue.presumed_profit,
                time_in_hours: revenue.time_in_hours,
                yield_per_quantity: revenue.yield_per_quantity,
                value_defined_by_revenue: value_defined_by_revenue,
            })
        })
    }
}
