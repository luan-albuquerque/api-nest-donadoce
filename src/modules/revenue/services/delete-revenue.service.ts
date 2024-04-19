import { Injectable, NotFoundException } from '@nestjs/common';
import { RevenuesRepository } from '../repository/contract/RevenuesRepository';
import { RevenuesIngredientsRepository } from 'src/modules/revenue_ingredient/repository/contract/RevenuesIngredientsRepository';
import { MenuItemRepository } from 'src/modules/menu_items/repository/contract/MenuItemRepository';

@Injectable()
export class DeleteRevenueService {

    constructor(
        private readonly revenuesRepository: RevenuesRepository,
        private readonly revenuesIngredientsRepository: RevenuesIngredientsRepository,
        private readonly menuItemRepository: MenuItemRepository
    ) { }

    async execute(id: string) {
        const revenue = await this.revenuesRepository.findByOne(id)

        if (!revenue) {
            throw new NotFoundException("Receita não encontrada")
        }

        const itemMenu = await this.menuItemRepository.findOne(id)

        if (itemMenu) {
            await this.revenuesRepository.putStatus(id)
        } else {
            await this.revenuesIngredientsRepository.removeAllByRevenue(id).finally(async () => {
                await this.revenuesRepository.remove(id)
            })
        }

    }
}
