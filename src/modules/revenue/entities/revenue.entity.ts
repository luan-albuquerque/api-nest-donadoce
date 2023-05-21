import { RevenueIngredient } from "src/modules/revenue_ingredient/entities/revenue_ingredient.entity"

export class Revenue {
    id: string
    description: string
    value: number
    yield_per_quantity: number
    presumed_profit: number
    imagem: string
    created_at: Date
    updated_t?: Date
    ingredients_Revenues?: RevenueIngredient[]

}
