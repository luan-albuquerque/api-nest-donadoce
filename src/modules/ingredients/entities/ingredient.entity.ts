import { IngredientControl } from "src/modules/ingredient_control/entities/ingredient_control.entity"


type Unit_of_measurement = 'ml' | 'l' | 'g' | 'kg';
export class Ingredient {
    id?: string
    description: string
    value: number
    unit_of_measurement: Unit_of_measurement
    amount_actual?: number
    Ingredient_control?: IngredientControl
}
