import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateRevenueDto } from '../dto/create-revenue.dto';
import { IngredientsRepository } from 'src/modules/ingredients/repository/contract/IngredientsRepository';
import { RevenuesRepository } from '../repository/contract/RevenuesRepository';
import { CreateRevenueIngredientDto } from 'src/modules/revenue_ingredient/dto/create-revenue_ingredient.dto';
import { RevenuesIngredientsRepository } from 'src/modules/revenue_ingredient/repository/contract/RevenuesIngredientsRepository';

@Injectable()
export class CreateRevenueService {

    constructor(
        private readonly ingredientsRepository: IngredientsRepository,
        private readonly revenuesRepository: RevenuesRepository,
        private readonly revenuesIngredientsRepository: RevenuesIngredientsRepository,
    ) { }

    async execute(createRevenueDto: CreateRevenueDto) {

        const createRevenueIngredientDto: CreateRevenueIngredientDto[] = []
        
        createRevenueDto.description = createRevenueDto.description.toUpperCase()

        const revenue = await this.revenuesRepository.findByDescription(createRevenueDto.description)

        if (revenue) {
            throw new UnauthorizedException("Descrição já existente em outra receita")
        }
        
        createRevenueDto.value_defined_by_revenue = 0;

        createRevenueDto.order_type = createRevenueDto.status == 1 ? "programmed" : "coffe";
        if (createRevenueDto.ingredients) {
            const convertIngredients = JSON.parse(String(createRevenueDto.ingredients))
 
            await Promise.all(
                convertIngredients.map(async (item) => {
                    const busca = await this.ingredientsRepository.findById(item.fk_ingredient)
                    if (!busca) {
                        throw new NotFoundException("Ingrediente não existe!")
                    }
                    createRevenueDto.value_defined_by_revenue += busca.value_per_serving * item.amount_ingredient;
                })
            )
        }

        const createRevenue = await this.revenuesRepository.create(createRevenueDto)

        if (createRevenue) {
            if (createRevenueDto.ingredients) {
            const convertIngredients = JSON.parse(String(createRevenueDto.ingredients))

                await Promise.all(
                    convertIngredients.map(async (item) => {
                        createRevenueIngredientDto.push({
                            fk_ingredient: item.fk_ingredient,
                            fk_revenues: createRevenue.id,
                            amount_ingredient: item.amount_ingredient
                        })
                    })
                     


                    
                )
            }
        }

        await this.revenuesIngredientsRepository.create(createRevenueIngredientDto)




    }

}
