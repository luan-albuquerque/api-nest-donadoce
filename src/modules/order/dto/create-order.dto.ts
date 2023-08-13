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

    @IsString({ message: 'Variável fk_menu precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_menu não pode esvaziar' })
    @ApiProperty()
    fk_menu: string;
    
    @ApiProperty({ type: CreateOrderItemDto, isArray: true})
    @Type(()=> CreateOrderItemDto)
    createOrderItemDto: CreateOrderItemDto[]

    @ApiProperty({ type: CreateOrderItemDto, isArray: true})
    @Type(()=> CreateOrderItemDto)
    createOrderNotMenuItemDto: CreateOrderItemDto[]

}
