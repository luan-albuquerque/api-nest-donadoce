import { Ingredient } from "src/modules/ingredients/entities/ingredient.entity"
import { Revenue } from "src/modules/revenue/entities/revenue.entity"

export class RevenueIngredient {

    fk_ingredient: string
    fk_revenues: string
    amount_ingredient: number
    ingredients?: Ingredient
    revenues?: Revenue
}
