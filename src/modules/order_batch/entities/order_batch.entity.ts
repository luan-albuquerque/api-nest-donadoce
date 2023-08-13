import { OrderBatchItem } from "src/modules/order_batch_item/entities/order_batch_item.entity"

export class OrderBatch {

    id: string
    invoice_file: string
    fk_client: string
    invoice_number: string
    numberOrderBatch: number

    OrderBatchItem?: OrderBatchItem[] 

}
