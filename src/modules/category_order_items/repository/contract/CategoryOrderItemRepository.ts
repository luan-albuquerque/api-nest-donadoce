import { CategoryOrderItem } from "../../entities/category_menu_item.entity";

export abstract class CategoryOrderItemRepository {
    abstract findAllProg(): Promise<CategoryOrderItem[]>
    abstract findAllCoffe(): Promise<CategoryOrderItem[]>
    abstract findAll(): Promise<CategoryOrderItem[]>
    abstract findOne(id: string): Promise<CategoryOrderItem>


    
}