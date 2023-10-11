import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { MethodOfPreparationType } from "../types/method-of-preparation.type";

class UpdateOrderProgrammedItemDto {


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


export class UpdateOrderProgrammedDto {

    @IsString({ message: 'Variável fk_menu precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_menu não pode ser vazia' })
    @ApiProperty()
    fk_menu: string;
    
    @ApiProperty({ type: UpdateOrderProgrammedItemDto, isArray: true})
    @Type(()=> UpdateOrderProgrammedItemDto)
    @ValidateNested({each: true})
    updateOrderItemDto: UpdateOrderProgrammedItemDto[]  

}
