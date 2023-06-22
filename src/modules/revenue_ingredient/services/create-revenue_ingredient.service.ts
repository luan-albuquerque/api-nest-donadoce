import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateRevenueIngredientDto } from '../dto/create-revenue_ingredient.dto';
import { IngredientsRepository } from 'src/modules/ingredients/repository/contract/IngredientsRepository';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { RevenuesIngredientsRepository } from '../repository/contract/RevenuesIngredientsRepository';

@Injectable()
export class CreateRevenueIngredientService {
    constructor(
        private readonly ingredientsRepository: IngredientsRepository,
        private readonly revenuesRepository: RevenuesRepository,
        private readonly revenuesIngredientsRepository: RevenuesIngredientsRepository,
    ) { }
    async execute(createRevenueIngredientDto: CreateRevenueIngredientDto[]) {
    
        
        if (createRevenueIngredientDto && createRevenueIngredientDto.length > 0) {
            const efctiveCreateRevenueIngredientDto:CreateRevenueIngredientDto[] = []
            await Promise.all(
                createRevenueIngredientDto.map(async (item) => {

                    const ingredient = await this.ingredientsRepository.findById(item.fk_ingredient)
                    if (!ingredient) {
                        throw new UnauthorizedException("Ingrediente não existente")
                    }
                    const revenue = await this.revenuesRepository.findByOne(item.fk_revenues)

                    if (!revenue) {
                        throw new UnauthorizedException("Receita não existente")
                    }

                    
                    const ingredientAllExistInRevenue = await this.revenuesIngredientsRepository.findOneIngredient(item.fk_ingredient, item.fk_revenues)
         
                
                    if(!ingredientAllExistInRevenue){
                        
                        efctiveCreateRevenueIngredientDto.push(item)
                    }

                    
                }))

            await this.revenuesIngredientsRepository.create(efctiveCreateRevenueIngredientDto)
        } else {
            throw new NotFoundException("Adicione pelo menos um ingrediente na receita")

        }


    }
}
