import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { MethodOfPreparationType } from "../types/method-of-preparation.type";

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

    @ApiProperty()
    method_of_preparation: MethodOfPreparationType


}

class CreateOrderNotMenuItemDto extends CreateOrderItemDto {
    
    @ApiProperty()
    delivery_date: Date;
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
    createOrderNotMenuItemDto: CreateOrderNotMenuItemDto[]

}
