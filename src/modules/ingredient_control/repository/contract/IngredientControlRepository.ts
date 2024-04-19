import { Ingredient } from "src/modules/ingredients/entities/ingredient.entity";
import { CreateIngredientControlDto } from "../../dto/create-ingredient_control.dto";

export abstract class IngredientControlRepository {
    abstract createFluxoIngredient(createIngredientControlDto: CreateIngredientControlDto): Promise<void>


}