import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Ingredient } from "src/modules/ingredients/entities/ingredient.entity"
import { Revenue } from "src/modules/revenue/entities/revenue.entity"

export class DeleteRevenueIngredientDto {
    @ApiProperty()
    @IsString({ message: 'fk_ingredient precisa ser string' })
    @IsNotEmpty({ message: 'fk_ingredient não pode esvaziar' })
    fk_ingredient: string
    @ApiProperty()

    @IsString({ message: 'fk_revenues precisa ser string' })
    @IsNotEmpty({ message: 'fk_revenues não pode esvaziar' })
    fk_revenues: string

}
