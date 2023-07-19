import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMenuDto } from "../dto/create-menu.dto";
import { MenuRepository } from "../repository/contract/MenuRepository";
import { RevenuesRepository } from "src/modules/revenue/repository/contract/RevenuesRepository";
import { CategoryMenuItemRepository } from "src/modules/category_menu_items/repository/contract/CategoryMenuItemRepository";
import { ItemsMenuCategoryUtils } from "src/shared/utils/ItemsMenuCategory.utils";

@Injectable()
export class CreateMenuService {

    constructor(
        private readonly menuRepository: MenuRepository,
        private readonly revenuesRepository: RevenuesRepository,
    ) { }

    async execute({ dateMenu, createItensMenu }: CreateMenuDto) {
        
        await Promise.all(
            createItensMenu.map(async (item) => {
                const revenue = await this.revenuesRepository.findByOne(item.fk_revenues)

                if (!revenue) {
                    throw new NotFoundException(`Receita não encontrada - fk_revenue: ${item.fk_revenues}`)
                }
                // Valor de Receita atual
                item.revenue_value_on_the_day = revenue.value
       

            })

        )



        await this.menuRepository.create({dateMenu, createItensMenu})
    }

}