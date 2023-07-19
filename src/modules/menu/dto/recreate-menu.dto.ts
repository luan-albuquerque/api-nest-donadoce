import { ApiProperty  } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsString, ValidateNested, ArrayMaxSize, ArrayMinSize } from "class-validator"

class RecreateItensMenuDto {
    @IsString({ message: 'Campo de receita precisa ser string' })
    @IsNotEmpty({ message: 'Campo de receita não pode ser vazio' })
    @ApiProperty()
    fk_revenues: string

    revenue_value_on_the_day: number

}

export class RecreateMenuDto {

    @ApiProperty({ type: RecreateItensMenuDto, isArray: true, required: true, minLength: 4, maxLength: 4})
    @IsArray({message: 'RecreateItensMenuDto precisa ser um array' })
    @ValidateNested({each: true})
    @Type(()=> RecreateItensMenuDto)
    // @ArrayMinSize(4,{ message: "Array menor que 4 elementos"})
    @ArrayMaxSize(4, { message: "Array maior que 4 elementos"})
    recreateItensMenu: RecreateItensMenuDto[]
}
