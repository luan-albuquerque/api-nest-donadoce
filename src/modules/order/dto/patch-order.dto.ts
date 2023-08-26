import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import { CreateOrderBatchItem } from "src/modules/order_batch_item/dto/create_order_batch_item.dto"
import { OrderBatchItem } from "src/modules/order_batch_item/entities/order_batch_item.entity"

export class PatchOrderDto {
    @IsString({ message: 'Variável fk_orderstatus precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_orderstatus não pode esvaziar' })
    @ApiProperty()
    fk_orderstatus: string
}
