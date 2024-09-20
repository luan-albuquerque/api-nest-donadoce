import { OrderType } from "src/modules/order/types/ordertype.type"

export class FindItemProductionDto {

    fk_revenue?: string
    fk_categoryOrderItem?: string
    delivery_date?: Date
    order_type?: OrderType
}