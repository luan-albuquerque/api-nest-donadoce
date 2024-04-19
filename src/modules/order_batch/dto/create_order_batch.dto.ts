import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"
import { CreateOrderBatchItem } from "src/modules/order_batch_item/dto/create_order_batch_item.dto"

export class CreateOrderBatch {
    @IsString({ message: 'fk_user precisa ser string' })
    @IsNotEmpty({ message: 'fk_user não pode esvaziar' })
    @ApiProperty()
    fk_user: string


    @ApiProperty({ type: 'string', format: 'binary', required: false })
    file_invoice?: string

    // @ApiProperty({ type: 'string', format: 'binary', required: false })
    // file_caution?: string

    // @ApiProperty({ type: 'string', format: 'binary', required: false })
    // file_payment_voucher?: string

    file_invoice_absolute?: string
    // file_caution_absolute?: string
    // file_payment_voucher_absolute?: string

    @ApiProperty()
    invoice_number?: string

    @IsNotEmpty({ message: 'end_date não pode esvaziar' })
    @ApiProperty()
    initial_date: Date

    @IsNotEmpty({ message: 'end_date não pode esvaziar' })
    @ApiProperty()
    end_date: Date

    userOpenOrderBatch?: string

    @ApiProperty({ type: CreateOrderBatchItem, isArray: true })
    @Type(() => CreateOrderBatchItem)
    createOrderBatchItem: CreateOrderBatchItem[]
}
