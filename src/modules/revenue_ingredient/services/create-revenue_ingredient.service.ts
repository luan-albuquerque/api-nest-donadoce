import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateRevenueIngredientDto } from '../dto/create-revenue_ingredient.dto';
import { IngredientsRepository } from 'src/modules/ingredients/repository/contract/IngredientsRepository';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { RevenuesIngredientsRepository } from '../repository/contract/RevenuesIngredientsRepository';
import { Revenue } from 'src/modules/revenue/entities/revenue.entity';

@Injectable()
export class CreateRevenueIngredientService {
    constructor(
        private readonly ingredientsRepository: IngredientsRepository,
        private readonly revenuesRepository: RevenuesRepository,
        private readonly revenuesIngredientsRepository: RevenuesIngredientsRepository,
    ) { }
    async execute(createRevenueIngredientDto: CreateRevenueIngredientDto[]) {


        if (createRevenueIngredientDto && createRevenueIngredientDto.length > 0) {
            const efctiveCreateRevenueIngredientDto: CreateRevenueIngredientDto[] = []
            var value_defined_by_revenue = 0;
            var revenue: Revenue = null;
            await Promise.all(
                createRevenueIngredientDto.map(async (item) => {

                    const ingredient = await this.ingredientsRepository.findById(item.fk_ingredient)
                    if (!ingredient) {
                        throw new UnauthorizedException("Ingrediente não existente")
                    }
                    revenue = await this.revenuesRepository.findByOne(item.fk_revenues)

                    if (!revenue) {
                        throw new UnauthorizedException("Receita não existente")
                    }

                    value_defined_by_revenue = revenue.value_defined_by_revenue;


                    const ingredientAllExistInRevenue = await this.revenuesIngredientsRepository.findOneIngredient(item.fk_ingredient, item.fk_revenues)


                    if (!ingredientAllExistInRevenue) {

                        efctiveCreateRevenueIngredientDto.push(item)
                        value_defined_by_revenue += ingredient.value_per_serving * item.amount_ingredient;
                    }


                }))


            await this.revenuesIngredientsRepository.create(efctiveCreateRevenueIngredientDto).then(async () => {
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
        } else {
            throw new NotFoundException("Adicione pelo menos um ingrediente na receita")

        }


    }
}
