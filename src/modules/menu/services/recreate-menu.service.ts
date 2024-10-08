import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMenuDto } from "../dto/create-menu.dto";
import { MenuRepository } from "../repository/contract/MenuRepository";
import { RevenuesRepository } from "src/modules/revenue/repository/contract/RevenuesRepository";
import { RecreateMenuDto } from "../dto/recreate-menu.dto";

@Injectable()
export class RecreateMenuService {

    constructor(
        private readonly menuRepository: MenuRepository,
        private readonly revenuesRepository: RevenuesRepository,
    ) { }

    async execute(id: string, { recreateItensMenu }: RecreateMenuDto) {

        const menu = await this.menuRepository.findOne(id)

        if (!menu) {
            throw new NotFoundException(`Menu não encontrado`)

        }

        const revenueAll = await this.revenuesRepository.findByAllNotFilter();


        await Promise.all(
            recreateItensMenu.map(async (item) => {
                const revenue = revenueAll.find((iRevenue) => iRevenue.id == item.fk_revenues)

                if (!revenue) {
                    throw new NotFoundException(`Receita não encontrada - fk_revenue: ${item.fk_revenues}`)
                }
                // Valor de Receita atual
                item.revenue_value_on_the_day = Number(revenue.value)
                item.revenue_value_on_the_day = revenue.value
                if (item.max_amount <= 0) {
                    item.max_amount = revenue.base_max_amount
                }
                if (item.max_amount <= 0) {
                    item.min_amount = revenue.base_min_amount
                }
            })

        )


        await this.menuRepository.create({ dateMenu: menu.dateMenu, createItensMenu: recreateItensMenu })
        await this.menuRepository.updateStatus(menu.id)

    }

}