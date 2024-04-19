import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { MethodOfPreparationType } from "src/modules/order/types/method-of-preparation.type";

export class AddItemInOrderDTO {


    @IsString({ message: 'Variável fk_menu precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_menu não pode ser vazia' })
    @ApiProperty()
    fk_menu: string;

    @IsString({ message: 'Variável fk_revenue precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_revenue não pode ser vazia' })
    @ApiProperty()
    fk_revenue: string;

    @IsString({ message: 'Variável fk_categoryOrderItem precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_categoryOrderItem não pode ser vazia' })
    @ApiProperty()
    fk_categoryOrderItem: string

    @IsString({ message: 'Variável fk_order precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_order não pode ser vazia' })
    @ApiProperty()
    fk_order: string

    @IsNumber()
    @ApiProperty()
    amountItem: number

    delivery_date: Date;

    dateOrderItem: Date

    valueOrderItem: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Variável modo de preparo não pode ser vazia' })
    method_of_preparation: MethodOfPreparationType


}