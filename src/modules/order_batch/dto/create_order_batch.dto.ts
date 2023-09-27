import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"
import { CreateOrderBatchItem } from "src/modules/order_batch_item/dto/create_order_batch_item.dto"

export class CreateOrderBatch {
    @IsString({ message: 'fk_client precisa ser string' })
    @IsNotEmpty({ message: 'fk_client não pode esvaziar' })
    @ApiProperty()
    fk_client: string


    @ApiProperty({ type: 'string', format: 'binary', required: false })
    file_invoice?: string

    // @ApiProperty({ type: 'string', format: 'binary', required: false })
    // file_caution?: string

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    file_payment_voucher?: string

    file_invoice_absolute?: string
    // file_caution_absolute?: string
    file_payment_voucher_absolute?: string

    @IsString({ message: 'invoice_number precisa ser string' })
    @IsNotEmpty({ message: 'invoice_number não pode esvaziar' })
    @ApiProperty()
    invoice_number: string

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
