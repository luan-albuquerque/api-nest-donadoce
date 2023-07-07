import { CategoryMenuItem } from "src/modules/category_menu_items/entities/category_menu_item.entity"
import { Revenue } from "src/modules/revenue/entities/revenue.entity"

export class MenuItem {
    id: string
    fk_revenues: string
    fk_menu: string
    fk_category: string
    revenue_value_on_the_day: number
    categoryMenuItem?: CategoryMenuItem
    revenues?: Revenue  
    
}
