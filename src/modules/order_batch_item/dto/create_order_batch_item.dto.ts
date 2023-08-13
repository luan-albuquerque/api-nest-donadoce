import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateOrderBatchItem {
    @IsString({ message: 'invoice_number precisa ser string' })
    @IsNotEmpty({ message: 'invoice_number não pode esvaziar' })
    @ApiProperty()
    fk_order: string

    // @IsString({ message: 'invoice_number precisa ser string' })
    // @IsNotEmpty({ message: 'invoice_number não pode esvaziar' })
    // @ApiProperty()
    // fk_orderBatch: string
}
