import { PartialType } from '@nestjs/swagger';
import { CreateIngredientControlDto } from './create-ingredient_control.dto';

export class UpdateIngredientControlDto extends PartialType(CreateIngredientControlDto) {}
