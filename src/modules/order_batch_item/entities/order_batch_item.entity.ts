import { Order } from "src/modules/order/entities/order.entity"
import { OrderBatch } from "src/modules/order_batch/entities/order_batch.entity"

export class OrderBatchItem {
    fk_order: string
    fk_orderBatch: string
    is_removed: boolean
    created_at: Date
    deleted_at: Date
    orderBatch?: OrderBatch
    order?: Order

}
