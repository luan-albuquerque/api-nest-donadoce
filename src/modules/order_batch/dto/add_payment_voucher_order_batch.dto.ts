import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"
import { CreateOrderBatchItem } from "src/modules/order_batch_item/dto/create_order_batch_item.dto"

export class AddPaymentVoucherOrderBatch {
    
    @ApiProperty({ type: 'string', format: 'binary', required: false })
    file_payment_voucher?: string

}
