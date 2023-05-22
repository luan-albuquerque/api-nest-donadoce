import { ApiProperty,  } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsString, IsArray,IsNumber, IsUUID, IsEmpty, IsNotEmpty, IsJSON } from "class-validator"
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
    @Type(()=> Number)
    @IsNotEmpty({ message: 'Valor não pode ser vazio' })
    value: number

    @ApiProperty({required: false})
    @IsNumber()
    @Type(()=> Number)
    yield_per_quantity?: number

    @IsNumber()
    @Type(()=> Number)
    @ApiProperty({required: false})
    time_in_hours?: number

    @IsNumber()
    @Type(()=> Number)
    @ApiProperty({required: false})
    presumed_profit?: number

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    imagem?: string

    @ApiProperty({
        required:false,
        type: 'array',
        items: {
          example:[
           {
            fk_ingredient: "id do ingrediente 1",
            amount_ingredient: "Quantidade que vai na receita (em number)",
           },
           {
            fk_ingredient: "id do ingrediente 2",
            amount_ingredient: "Quantidade que vai na receita (em number)",
           },
          ],
          properties: {
            fk_ingredient: { type: 'string' },
            amount_ingredient: { type: 'number' },
          },
        },
      })
  
    @IsJSON({ message: 'ingredients precisa ser um array de uuid de ingredientes com quantidade' })
    @Type(()=> Object)
    ingredients?: IngredientWithAmount[]
  
}
