import { PartialType } from '@nestjs/swagger';
import { CreateIngredientDto } from './create-ingredient.dto';

export class UpdateIngredientDto extends CreateIngredientDto {
    amount_actual?: number
}
