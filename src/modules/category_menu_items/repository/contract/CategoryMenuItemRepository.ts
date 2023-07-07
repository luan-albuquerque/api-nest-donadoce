import { CategoryMenuItem } from "../../entities/category_menu_item.entity";

export abstract class CategoryMenuItemRepository {
    abstract findAll(): Promise<CategoryMenuItem[]>
    abstract findOne(id: string): Promise<CategoryMenuItem>
}