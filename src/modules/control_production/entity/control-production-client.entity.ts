import { OrderType } from "src/modules/order/types/ordertype.type"

export class ControlProductionClientEntity {
    id: string
    seq: number
    fk_user: string
    corporate_name: string
    fk_revenue: string
    description: string
    fk_categoryOrderItem: string
    description_category: string
    delivery_date: Date
    order_type: OrderType
    amount_actual: number
}