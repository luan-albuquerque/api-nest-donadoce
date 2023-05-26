import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateIngredientDto {
    @IsString({ message: 'Descrição precisa ser string' })
    @IsNotEmpty({ message: 'Descrição não pode esvaziar' })
    @ApiProperty()
    description: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: 'Valor não pode ser vazio' })
    value: number
}
