import { Injectable } from "@nestjs/common";
import { FiltersMenuDTO } from "../dto/filters-menu.dto";
import { MenuRepository } from "../repository/contract/MenuRepository";
import { Menu } from "../entities/menu.entity";

@Injectable()
export class FindAllMenuService {

    constructor(
        private readonly menuRepository: MenuRepository
    ) { }

    async execute(filtersMenuDTO: FiltersMenuDTO): Promise<Menu[]> {
        
        return await this.menuRepository.findAll(filtersMenuDTO)
    }

}