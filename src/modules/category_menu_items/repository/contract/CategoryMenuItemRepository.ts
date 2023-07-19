import { CategoryOrderItem } from "../../entities/category_menu_item.entity";

export abstract class CategoryMenuItemRepository {
    abstract findAll(): Promise<CategoryOrderItem[]>
    abstract findOne(id: string): Promise<CategoryOrderItem>


    
}