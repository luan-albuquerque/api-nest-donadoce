import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientsRepository } from '../repository/contract/IngredientsRepository';

@Injectable()
export class FindOneIngredientsService {

  constructor(private readonly ingredientsRepository:IngredientsRepository){}
   async execute(id: string) {
      if (!id) {
        throw new NotFoundException("Identificador não encontrado")
      }
  
      const findIngredient = await this.ingredientsRepository.findById(id)
      if (!findIngredient) {
        throw new NotFoundException("Ingrediente não encontrado")
      }

      return findIngredient
      }
}
