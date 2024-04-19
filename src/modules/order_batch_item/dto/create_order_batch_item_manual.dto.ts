import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateOrderBatchItemManual {
    @IsString({ message: 'fk_order precisa ser string' })
    @IsNotEmpty({ message: 'fk_order não pode esvaziar' })
    @ApiProperty()
    fk_order: string

    @IsString({ message: 'fk_orderBatch precisa ser string' })
    @IsNotEmpty({ message: 'fk_orderBatch não pode esvaziar' })
    @ApiProperty()
    fk_orderBatch: string
}
