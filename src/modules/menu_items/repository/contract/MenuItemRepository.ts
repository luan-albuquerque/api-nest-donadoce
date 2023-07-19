import { MenuItem } from "../../entities/menu_item.entity";

export abstract class MenuItemRepository {
    abstract findOne(id: string):Promise<MenuItem[]>
    abstract findItensByMenu(fk_menu: string):Promise<MenuItem[]>
}