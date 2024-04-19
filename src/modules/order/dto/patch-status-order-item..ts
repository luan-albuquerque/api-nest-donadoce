import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import { CreateOrderBatchItem } from "src/modules/order_batch_item/dto/create_order_batch_item.dto"
import { OrderBatchItem } from "src/modules/order_batch_item/entities/order_batch_item.entity"

export class PatchStatusOrderItemDto {
    @IsString({ message: 'Variável fk_revenue precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_revenue não pode esvaziar' })
    @ApiProperty()
     fk_revenue: string
          
     @IsString({ message: 'Variável fk_categoryOrderItem precisa ser string' })
     @IsNotEmpty({ message: 'Variável fk_categoryOrderItem não pode esvaziar' })
     @ApiProperty()
     fk_categoryOrderItem: string

    @IsString({ message: 'Variável status_order_item precisa ser string' })
    @IsNotEmpty({ message: 'Variável status_order_item não pode esvaziar' })
    @ApiProperty()
    status_order_item: string
}
