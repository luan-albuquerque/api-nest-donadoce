import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"
import { CreateOrderBatchItem } from "src/modules/order_batch_item/dto/create_order_batch_item.dto"

export class CreateOrderBatch {
    @IsString({ message: 'fk_client precisa ser string' })
    @IsNotEmpty({ message: 'fk_client não pode esvaziar' })
    @ApiProperty()
    fk_client: string

    @IsString({ message: 'invoice_file precisa ser string' })
    @IsNotEmpty({ message: 'invoice_file não pode esvaziar' })
    @ApiProperty()
    invoice_file: string

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
 
    @ApiProperty({ type: CreateOrderBatchItem, isArray: true})
    @Type(()=> CreateOrderBatchItem)
    createOrderBatchItem: CreateOrderBatchItem[]
}
