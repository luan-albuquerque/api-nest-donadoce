import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMenuDto } from "../dto/create-menu.dto";
import { MenuRepository } from "../repository/contract/MenuRepository";
import { RevenuesRepository } from "src/modules/revenue/repository/contract/RevenuesRepository";
import { CategoryMenuItemRepository } from "src/modules/category_menu_items/repository/contract/CategoryMenuItemRepository";
import { ItemsMenuCategoryUtils } from "src/shared/utils/ItemsMenuCategory.utils";
import { RecreateMenuDto } from "../dto/recreate-menu.dto";

@Injectable()
export class RecreateMenuService {

    constructor(
        private readonly menuRepository: MenuRepository,
        private readonly revenuesRepository: RevenuesRepository,
        private readonly categoryMenuItemRepository: CategoryMenuItemRepository,
    ) { }

    async execute(id: string, {recreateItensMenu}: RecreateMenuDto) {

        const menu = await this.menuRepository.findOne(id)

        if(!menu){
            throw new NotFoundException(`Menu não encontrado`)
            
        }
        
        const category = await this.categoryMenuItemRepository.findAll();
        await ItemsMenuCategoryUtils().verifyCategory(category, recreateItensMenu)
        await Promise.all(
            recreateItensMenu.map(async (item) => {
                const revenue = await this.revenuesRepository.findByOne(item.fk_revenues)

                if (!revenue) {
                    throw new NotFoundException(`Receita não encontrada - fk_revenue: ${item.fk_revenues}`)
                }
                // Valor de Receita atual
                item.revenue_value_on_the_day = revenue.value
                const category = await this.categoryMenuItemRepository.findOne(item.fk_category)
          
                
                if (!category) {
                    throw new NotFoundException(`Category não encontrada - fk_category: ${item.fk_category}`)
                }

            })

        )



        await this.menuRepository.create({dateMenu: menu.dateMenu, createItensMenu: recreateItensMenu})
        await this.menuRepository.updateStatus(menu.id)
    
    }

}