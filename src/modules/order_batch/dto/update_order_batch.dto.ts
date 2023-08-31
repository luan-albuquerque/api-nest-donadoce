
import { IsNotEmpty, IsString } from "class-validator"
import { CreateOrderBatch } from "./create_order_batch.dto"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateOrderBatch {

    @IsString({ message: 'fk_client precisa ser string' })
    @IsNotEmpty({ message: 'fk_client não pode esvaziar' })
    @ApiProperty()
    fk_client: string
  

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    _file?: string

    invoice_file: string

    file_absolute?: string

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

}
