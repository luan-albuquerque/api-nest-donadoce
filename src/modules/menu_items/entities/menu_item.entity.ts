import { Revenue } from "src/modules/revenue/entities/revenue.entity"

export class MenuItem {
    fk_revenues: string
    fk_menu?: string
    revenue_value_on_the_day: number
    revenues?: Revenue  
    
}
