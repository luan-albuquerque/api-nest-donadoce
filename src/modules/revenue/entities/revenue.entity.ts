import { OrderType } from "src/modules/order/types/ordertype.type"
import { RevenueIngredient } from "src/modules/revenue_ingredient/entities/revenue_ingredient.entity"

export class Revenue {
    id: string
    description: string
    value: number
    yield_per_quantity: number
    presumed_profit: number
    base_max_amount?: number
    base_min_amount?: number
    imagem: string
    order_type: OrderType
    created_at: Date
    updated_t?: Date
    ingredients_Revenues?: RevenueIngredient[]

}
