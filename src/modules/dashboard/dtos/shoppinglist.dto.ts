import { ApiProperty } from "@nestjs/swagger"

export class ShoppingListDto {
    @ApiProperty()
    orderStatus?: string

    @ApiProperty()
    orderType?: string

    @ApiProperty()
    client?: string
    
    @ApiProperty()
    data?: Date
}