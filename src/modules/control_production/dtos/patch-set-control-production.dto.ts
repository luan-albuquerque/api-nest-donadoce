import { ApiOperation, ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { OrderType } from "src/modules/order/types/ordertype.type"

export class PatchSetControlProductionProductDto {
    @IsNotEmpty({ message: 'Campo de id não pode ser vazio' })
    @ApiProperty()
    id: string

    @IsNotEmpty({ message: 'Campo de set não pode ser vazio' })
    @ApiProperty()
    set: number
}