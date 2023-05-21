import { ApiProperty,  } from "@nestjs/swagger"
import { IsString, IsArray,IsNumber, IsUUID, IsEmpty, IsNotEmpty } from "class-validator"
import { RevenueIngredient } from "src/modules/revenue_ingredient/entities/revenue_ingredient.entity"

class IngredientWithAmount {
    @ApiProperty()
    @IsString({ message: 'fk_ingredient precisa ser string' })
    @IsNotEmpty({ message: 'fk_ingredient não pode esvaziar' })
    fk_ingredient: string
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: 'amount_ingredient não pode ser vazio' })
    amount_ingredient: number

}
export class CreateRevenueDto {

    @IsString({ message: 'Descrição precisa ser string' })
    @IsNotEmpty({ message: 'Descrição não pode esvaziar' })
    @ApiProperty()
    description: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: 'Valor não pode ser vazio' })
    value: number

    @ApiProperty()
    @IsNumber()
    yield_per_quantity?: number

    @IsNumber()
    @ApiProperty() 
    time_in_hours?: number

    @ApiProperty()
    @IsNumber()
    presumed_profit?: number

    @ApiProperty()
    imagem?: string
    // @IsEmpty()
    @ApiProperty({
        type: 'array',
        items: {
          properties: {
            fk_ingredient: { type: 'string' },
            amount_ingredient: { type: 'number' },
          },
        },
      })
    @IsArray({ message: 'fk_ingredient precisa ser um array de uuid de ingredientes' })
    ingredients?: IngredientWithAmount[]
  
}
