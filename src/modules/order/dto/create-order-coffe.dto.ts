import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { MethodOfPreparationType } from "../types/method-of-preparation.type";

class CreateOrderCoffeItemDto {


    @IsString({ message: 'Variável fk_revenue precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_revenue não pode ser vazia' })
    @ApiProperty()
    fk_revenue: string;

    @IsNumber()
    @ApiProperty()
    amountItem: number

    @ApiProperty()
    @IsNotEmpty({ message: 'Variável delivery_date não pode ser vazio' })
    delivery_date: Date

    @ApiProperty()
    @IsNotEmpty({ message: 'Variável delivery_date não pode ser vazio' })
    order_time: Date

    @ApiProperty()
    @IsNotEmpty({ message: 'Variável modo de preparo não pode ser vazia' })
    method_of_preparation: MethodOfPreparationType


    @ApiProperty()
    comment?: string;


}


export class CreateOrderCoffeDto {

    @IsString({ message: 'Variável fk_company precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_company não pode ser vazia' })
    @ApiProperty()
    fk_company: string;

    @ApiProperty({ type: CreateOrderCoffeItemDto, isArray: true})
    @Type(()=> CreateOrderCoffeItemDto)
    @ValidateNested({each: true})
    createOrderCoffeItemDto: CreateOrderCoffeItemDto[]

}
