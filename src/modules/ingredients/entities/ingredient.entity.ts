import { IngredientControl } from "src/modules/ingredient_control/entities/ingredient_control.entity"

export class Ingredient {
    id?: string
    description: string
    value: number
    amount_actual?: number
    Ingredient_control?: IngredientControl
}
