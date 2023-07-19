import { Injectable } from '@nestjs/common';
import { CategoryMenuItemRepository } from '../repository/contract/CategoryMenuItemRepository';
import { CategoryOrderItem } from '../entities/category_menu_item.entity';


@Injectable()
export class FindAllCategoryMenuItemsService {

  constructor(
    private readonly categoryMenuItemRepository: CategoryMenuItemRepository
  ) { }
  async execute(): Promise<CategoryOrderItem[]> {
    return await this.categoryMenuItemRepository.findAll()
  }

}
