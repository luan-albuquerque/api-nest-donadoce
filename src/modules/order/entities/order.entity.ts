import { CreateOrderBatchItem } from "src/modules/order_batch_item/dto/create_order_batch_item.dto"
import { OrderBatchItem } from "src/modules/order_batch_item/entities/order_batch_item.entity"
import { OrderType } from "../types/ordertype.type"
import { OrderItem } from "../../order_item/entities/order-item.entity"

export class Order {
    id: string
    numberOrder: number
    dateOrder: Date
    valueOrder: number
    fk_orderstatus: string
    file_caution?: string
    file_invoice?: string
    invoice_number?: string
    file_payment_voucher?: string
    fk_user: string
    order_type: OrderType
    orderBatchItem?: OrderBatchItem
    orderItem?: OrderItem[]
}
