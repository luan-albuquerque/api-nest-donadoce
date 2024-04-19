import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateOrderBatchItem {
    @IsString({ message: 'fk_order precisa ser string' })
    @IsNotEmpty({ message: 'fk_order não pode esvaziar' })
    @ApiProperty()
    fk_order: string

    // @IsString({ message: 'invoice_number precisa ser string' })
    // @IsNotEmpty({ message: 'invoice_number não pode esvaziar' })
    // @ApiProperty()
    // fk_orderBatch: string
}
