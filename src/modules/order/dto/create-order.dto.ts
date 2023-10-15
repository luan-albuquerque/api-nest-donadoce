import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { MethodOfPreparationType } from "../types/method-of-preparation.type";

class CreateOrderItemDto {


    @IsString({ message: 'Variável fk_revenue precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_revenue não pode ser vazia' })
    @ApiProperty()
    fk_revenue: string;

    @IsString({ message: 'Variável fk_categoryOrderItem precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_categoryOrderItem não pode ser vazia' })
    @ApiProperty()
    fk_categoryOrderItem: string

    @IsNumber()
    @ApiProperty()
    amountItem: number

    @ApiProperty()
    @IsNotEmpty({ message: 'Variável modo de preparo não pode ser vazia' })
    method_of_preparation: MethodOfPreparationType


}

class CreateOrderNotMenuItemDto extends CreateOrderItemDto {}

export class CreateOrderDto {

    @IsString({ message: 'Variável fk_menu precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_menu não pode ser vazia' })
    @ApiProperty()
    fk_menu: string;

    @IsString({ message: 'Variável fk_company precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_company não pode ser vazia' })
    @ApiProperty()
    fk_company: string;
    
    @ApiProperty({ type: CreateOrderItemDto, isArray: true})
    @Type(()=> CreateOrderItemDto)
    @ValidateNested({each: true})
    createOrderItemDto: CreateOrderItemDto[]

    @ApiProperty({ type: CreateOrderItemDto, isArray: true})
    @Type(()=> CreateOrderItemDto)
    @ValidateNested({each: true})
    createOrderNotMenuItemDto: CreateOrderNotMenuItemDto[]

}
