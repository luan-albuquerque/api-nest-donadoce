import { OrderType } from "src/modules/order/types/ordertype.type"

export class CreateControlProductionProductDto {
  
    seq: number
    fk_revenue: string
    description: string
    fk_categoryOrderItem: string
    description_category: string
    delivery_date: Date
    order_type: OrderType
    amount_actual: number
}