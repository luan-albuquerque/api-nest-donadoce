import { ApiProperty  } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, MinLength,MaxLength, IsNotEmpty, IsString, ValidateNested, ArrayMaxSize, ArrayMinSize } from "class-validator"

class CreateItensMenuDto {
    @IsString({ message: 'Campo de receita precisa ser string' })
    @IsNotEmpty({ message: 'Campo de receita não pode ser vazio' })
    @ApiProperty()
    fk_revenues: string

    // @IsString({ message: 'Campo de receita precisa ser string' })
    // @IsNotEmpty({ message: 'Campo de receita não pode ser vazio' })
    // @ApiProperty()
    // fk_menu: string

    @IsString({ message: 'Campo de categoria precisa ser um uuid' })
    @IsNotEmpty({ message: 'Campo de categoria não pode ser vazio' })
    @ApiProperty()
    fk_category: string

    revenue_value_on_the_day: number

}

export class CreateMenuDto {
    // @IsDate({ message: 'Campo de dateMenu precisa ser uma data' })
    @IsNotEmpty({ message: 'Campo de dateMenu não pode ser vazio' })
    @ApiProperty()
    dateMenu: Date

    @ApiProperty({ type: CreateItensMenuDto, isArray: true, required: true, minLength: 4, maxLength: 4})
    @IsArray({message: 'createItensMenu precisa ser um array' })
    @ValidateNested({each: true})
    @Type(()=> CreateItensMenuDto)
    // @ArrayMinSize(4,{ message: "Array menor que 4 elementos"})
    // @ArrayMaxSize(4, { message: "Array maior que 4 elementos"})
    createItensMenu: CreateItensMenuDto[]
}
