import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"




type Unit_of_measurement = 'ml' | 'l' | 'g' | 'kg' | 'u';

export class CreateIngredientDto {
    @IsString({ message: 'Descrição precisa ser string' })
    @IsNotEmpty({ message: 'Descrição não pode pode ser vazio' })
    @ApiProperty()
    description: string

    @IsNotEmpty({ message: 'Unidade de Medida não pode ser vazio' })

    @ApiProperty({ enum: ['ml','l','g','kg','u']})
    unit_of_measurement: Unit_of_measurement

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: 'Valor por porção não pode ser vazio' })
    value_per_serving: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: 'Quantidade não pode ser vazio' })
    amount: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: 'Valor não pode ser vazio' })
    value: number
}
