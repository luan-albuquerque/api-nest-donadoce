import { CreateOrderBatchItem } from "src/modules/order_batch_item/dto/create_order_batch_item.dto"
import { OrderBatchItem } from "src/modules/order_batch_item/entities/order_batch_item.entity"
import { OrderType } from "../types/ordertype.type"
import { OrderItem } from "../../order_item/entities/order-item.entity"
import { Client } from "src/modules/clients/entities/client.entity"
import { User } from "src/modules/users/entities/user.entity"
import { Company } from "src/modules/company/entities/company.entity"

export class Order {
    id: string
    numberOrder: number
    dateOrder: Date
    valueOrder: number
    amount_of_boxes?: number
    comment_by_client?: string
    fk_orderstatus?: string
    fk_company?: string
    file_caution?: string
    file_invoice?: string
    invoice_number?: string
    file_payment_voucher?: string
    fk_user?: string
    order_type?: OrderType
    orderBatchItem?: OrderBatchItem
    orderItem?: OrderItem[]
    user?: User
    company?: Company
}
