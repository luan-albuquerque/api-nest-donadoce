import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class PatchItemInOrderDTO {

    @IsString({ message: 'Variável fk_order precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_order não pode ser vazia' })
    @ApiProperty()
    fk_order: string

    @IsString({ message: 'Variável fk_revenue precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_revenue não pode ser vazia' })
    @ApiProperty()
    fk_revenue: string

    @IsString({ message: 'Variável fk_categoryOrderItem precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_categoryOrderItem não pode ser vazia' })
    @ApiProperty()
    fk_categoryOrderItem: string

    @IsNumber()
    @ApiProperty()
    amountItem: number

}