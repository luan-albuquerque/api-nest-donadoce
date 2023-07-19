import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CategoryMenuItemRepository } from '../repository/contract/CategoryMenuItemRepository';
import { MenuRepository } from 'src/modules/menu/repository/contract/MenuRepository';
import { MenuItemRepository } from 'src/modules/menu_items/repository/contract/MenuItemRepository';

@Injectable()
export class FindAllRevenueOfMenuByCategoryService {

  constructor(
    private readonly categoryMenuItemRepository: CategoryMenuItemRepository,
    private readonly menuRepository: MenuRepository,
    private readonly menuItemRepository: MenuItemRepository,
  ) { }
  async execute(fk_menu: string): Promise<any> {
    const menu = await this.menuRepository.findOne(fk_menu)

    if (!menu) {
        throw new NotFoundException("Receita não encontrada")
    }

    const category = await this.categoryMenuItemRepository.findAll()
    const itensMenu = await this.menuItemRepository.findItensByMenu(fk_menu)
    
    await Promise.all(
    category.map((item)=>{
      item['itensMenu'] = itensMenu
    })
    );

    return category

  }

}
