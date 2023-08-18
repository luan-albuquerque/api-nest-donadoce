import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateIngredientDto } from '../dto/create-ingredient.dto';
import { IngredientsRepository } from '../repository/contract/IngredientsRepository';

@Injectable()
export class CreateIngredientsService {
  // Teste
  constructor(private readonly ingredientsRepository: IngredientsRepository) { }

  async execute(createIngredientDto: CreateIngredientDto) {
    const verifyNewDescription = await this.ingredientsRepository.findByDescription(createIngredientDto.description)

    createIngredientDto.unit_of_measurement = createIngredientDto.unit_of_measurement.toLowerCase() as any;
    
    if (verifyNewDescription) {
      throw new UnauthorizedException("Descrição já existente em outro ingrediente")
    }

    createIngredientDto.description = createIngredientDto.description.toUpperCase()

    await this.ingredientsRepository.create(createIngredientDto)

  }
}
