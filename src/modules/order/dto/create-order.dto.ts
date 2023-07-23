import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class CreateOrderItemDto {


    @IsString({ message: 'Variável fk_revenue precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_revenue não pode esvaziar' })
    @ApiProperty()
    fk_revenue: string;

    @IsString({ message: 'Variável fk_categoryOrderItem precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_categoryOrderItem não pode esvaziar' })
    @ApiProperty()
    fk_categoryOrderItem: string

    @IsNumber()
    @ApiProperty()
    amountItem: number


}

export class CreateOrderDto {


    @ApiProperty({ type: CreateOrderItemDto, isArray: true})
    @Type(()=> CreateOrderItemDto)
    createOrderItemDto: CreateOrderItemDto[]

}
