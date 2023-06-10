import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngredientControlDto } from '../dto/create-ingredient_control.dto';
import { UpdateIngredientControlDto } from '../dto/update-ingredient_control.dto';
import { IngredientControlRepository } from '../repository/contract/IngredientControlRepository';
import { IngredientsRepository } from 'src/modules/ingredients/repository/contract/IngredientsRepository';

@Injectable()
export class CreateIngredientFluxoService {
    constructor(
        private ingredientControlRepository: IngredientControlRepository,
        private ingredientsRepository: IngredientsRepository 
    ){}

    async execute(createIngredientControlDto:CreateIngredientControlDto){

        if (!createIngredientControlDto.fk_ingredient) {
            throw new NotFoundException("Identificador não encontrado")
          }
      
          const findIngredient = await this.ingredientsRepository.findById(createIngredientControlDto.fk_ingredient)
          if (!findIngredient) {
            throw new NotFoundException("Ingrediente não encontrado")
          }
        var actulQtd: number = findIngredient.amount_actual
        var newValue: number = findIngredient.value

        if(!createIngredientControlDto.is_output){
            actulQtd = actulQtd + createIngredientControlDto.amount
            newValue = createIngredientControlDto.unitary_value
        }else{
            actulQtd = createIngredientControlDto.amount - actulQtd
        }

        

        await this.ingredientControlRepository.createFluxoIngredient(createIngredientControlDto).then(async ()=>{

            await this.ingredientsRepository.update(findIngredient.id, {
                description: findIngredient.description,
                value: newValue,
                amount_actual: actulQtd,
            })
        })  
    }
}