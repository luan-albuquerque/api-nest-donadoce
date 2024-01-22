import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateIngredientDto } from '../dto/update-ingredient.dto';
import { IngredientsRepository } from '../repository/contract/IngredientsRepository';
import { Ingredient } from '../entities/ingredient.entity';

@Injectable()
export class UpdateIngredientsService {
  constructor(private readonly ingredientsRepository: IngredientsRepository) { }

  async execute(id: string, updateIngredientDto: UpdateIngredientDto) {
    if (!id) {
      throw new NotFoundException("Identificador não encontrado")
    }

    const findIngredient: Ingredient = await this.ingredientsRepository.findById(id)
    if (!findIngredient) {
      throw new NotFoundException("Ingrediente não encontrado")
    }
    updateIngredientDto.unit_of_measurement = updateIngredientDto.unit_of_measurement.toLowerCase() as any;

    const verifyNewDescription = await this.ingredientsRepository.findByDescription(updateIngredientDto.description)

    if (verifyNewDescription && findIngredient.description != updateIngredientDto.description) {
      throw new UnauthorizedException("Descrição já existente em outro ingrediente")
    }

    updateIngredientDto.description = updateIngredientDto.description.toUpperCase()

    await this.ingredientsRepository.update(id, updateIngredientDto)
  }

}
