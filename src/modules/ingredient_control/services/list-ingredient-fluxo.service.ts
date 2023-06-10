import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngredientControlDto } from '../dto/create-ingredient_control.dto';
import { UpdateIngredientControlDto } from '../dto/update-ingredient_control.dto';
import { IngredientControlRepository } from '../repository/contract/IngredientControlRepository';
import { IngredientsRepository } from 'src/modules/ingredients/repository/contract/IngredientsRepository';

@Injectable()
export class ListIngredientFluxoService {
    
    constructor(
        private ingredientsRepository: IngredientsRepository 
        
    ){}

    async execute(control: string){
        var controlF = true
        if(control === 'false'){
            controlF = false
        }

      const data = await this.ingredientsRepository.listFluxoIngredient(controlF)        

      return data;
    }
}
