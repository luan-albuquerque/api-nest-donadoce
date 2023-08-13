import { OrderBatch } from "src/modules/order_batch/entities/order_batch.entity"

export class OrderBatchItem {
    fk_order: string
    fk_orderBatch: string
    orderBatch?: OrderBatch
    
}
