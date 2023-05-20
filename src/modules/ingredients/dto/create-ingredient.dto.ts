import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateIngredientDto {
    @IsString({ message: 'Descrição precisa ser string' })
    @IsNotEmpty({ message: 'Descrição não pode esvaziar' })
    @ApiProperty()
    description: string

    @ApiProperty()
    @IsInt({ message: 'Valor não pode ser string' })
    @IsNotEmpty({ message: 'Valor não pode ser vazio' })
    value: number

    @ApiProperty()
    @IsInt({ message: 'Quantidade não pode ser string' })
    @IsNotEmpty({ message: 'Quantidade não pode ser vazio' })
    amount: number
}
