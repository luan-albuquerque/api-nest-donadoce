import { Injectable } from '@nestjs/common';
import { CreateIngredientControlDto } from '../dto/create-ingredient_control.dto';
import { UpdateIngredientControlDto } from '../dto/update-ingredient_control.dto';

@Injectable()
export class IngredientControlService {
  create(createIngredientControlDto: CreateIngredientControlDto) {
    return 'This action adds a new ingredientControl';
  }

  findAll() {
    return `This action returns all ingredientControl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredientControl`;
  }

  update(id: number, updateIngredientControlDto: UpdateIngredientControlDto) {
    return `This action updates a #${id} ingredientControl`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredientControl`;
  }
}
