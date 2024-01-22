import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateIngredientDto } from './create-ingredient.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateIngredientDto extends CreateIngredientDto {
    @IsNotEmpty({ message: 'amount_actual não pode pode ser vazio' })
    @ApiProperty()
    amount_actual?: number
}
