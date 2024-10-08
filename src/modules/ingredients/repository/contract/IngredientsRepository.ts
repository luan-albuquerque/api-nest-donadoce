import { CreateIngredientDto } from "../../dto/create-ingredient.dto";
import { PaginationOptions } from "../../dto/pagination-options.dto";
import { UpdateIngredientDto } from "../../dto/update-ingredient.dto";
import { Ingredient } from "../../entities/ingredient.entity";

export abstract class IngredientsRepository {
    abstract create(createIngredientDto: CreateIngredientDto): Promise<void>
    abstract remove(id: string): Promise<void>
    abstract update(id: string, updateIngredientDto: UpdateIngredientDto): Promise<void>
    abstract updateAmount(id: string, amount: number): Promise<Ingredient>
    abstract updateQuantity(id: string, amount: number): Promise<void>
    abstract list(data: PaginationOptions): Promise<Ingredient[]>
    abstract findById(id: string): Promise<Ingredient>
    abstract findByDescription(description: string): Promise<Ingredient>
    abstract listFluxoIngredient(control: boolean): Promise<Ingredient[]>
    //Dash
    abstract findManyOrderInProcessToListShopping(orderStatus: string, client: string, orderType: string, dataInitial: string, dataFinal: string): Promise<any>


}