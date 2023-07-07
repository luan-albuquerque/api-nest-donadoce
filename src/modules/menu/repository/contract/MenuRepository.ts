import { CreateMenuDto } from "../../dto/create-menu.dto";
import { FiltersMenuDTO } from "../../dto/filters-menu.dto";
import { Menu } from "../../entities/menu.entity";

export abstract class MenuRepository {
   abstract create(createMenuDto: CreateMenuDto):Promise<Menu>
   abstract findAll(filtersMenuDTO: FiltersMenuDTO): Promise<Menu[]>
   abstract findOne(id: string): Promise<Menu> 
   abstract updateStatus(id: string): Promise<void>
} 