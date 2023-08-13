import { CreateOrderBatchItem } from "src/modules/order_batch_item/dto/create_order_batch_item.dto"
import { OrderBatchItem } from "src/modules/order_batch_item/entities/order_batch_item.entity"

export class Order {
    id: string
    numberOrder: number
    dateOrder: Date
    valueOrder: number
    fk_orderstatus: string
    fk_user: string
    OrderBatchItem?: OrderBatchItem
}
