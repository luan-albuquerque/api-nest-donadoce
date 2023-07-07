import { Injectable } from '@nestjs/common';
import { CategoryMenuItem } from '../entities/category_menu_item.entity';
import { CategoryMenuItemRepository } from '../repository/contract/CategoryMenuItemRepository';

@Injectable()
export class FindAllCategoryMenuItemsService {

  constructor(
    private readonly categoryMenuItemRepository: CategoryMenuItemRepository
  ) { }
  async execute(): Promise<CategoryMenuItem[]> {
    return await this.categoryMenuItemRepository.findAll()
  }

}
