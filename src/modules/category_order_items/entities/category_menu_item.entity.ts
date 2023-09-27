import { OrderType } from "src/modules/order/types/ordertype.type"

export class CategoryOrderItem {
    id: string
    description: string
    order_type: OrderType
    time: Date
    
}
