import { OrderBatchItem } from "src/modules/order_batch_item/entities/order_batch_item.entity"
import { User } from "src/modules/users/entities/user.entity"

export class OrderBatch {

    id: string
    file_invoice: string
    // file_caution: string
    file_payment_voucher: string
    fk_client: string
    invoice_number: string
    numberOrderBatch: number
    OrderBatchItem?: OrderBatchItem[];
    user?: User

}
