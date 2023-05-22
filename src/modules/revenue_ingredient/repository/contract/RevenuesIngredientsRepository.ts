import { Ingredient } from "src/modules/ingredients/entities/ingredient.entity";
import { CreateRevenueIngredientDto } from "../../dto/create-revenue_ingredient.dto";
import { UpdateRevenueIngredientDto } from "../../dto/update-revenue_ingredient.dto";
import { RevenueIngredient } from "../../entities/revenue_ingredient.entity";

export abstract class RevenuesIngredientsRepository {
        abstract create(createRevenueIngredientDto: CreateRevenueIngredientDto[]): Promise<void>
        abstract findOneIngredient(fk_ingredient: string): Promise<RevenueIngredient>
        abstract remove(fk_ingredient: string, fk_revenues: string):Promise<void>
        abstract removeAllByRevenue( fk_revenue: string):Promise<void>
        abstract update(updateRevenueIngredientDto: UpdateRevenueIngredientDto): Promise<void>
    
}