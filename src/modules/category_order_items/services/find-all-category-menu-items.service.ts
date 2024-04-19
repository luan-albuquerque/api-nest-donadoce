import { Injectable } from '@nestjs/common';
import { CategoryOrderItemRepository } from '../repository/contract/CategoryOrderItemRepository';
import { CategoryOrderItem } from '../entities/category_menu_item.entity';


@Injectable()
export class FindAllCategoryMenuItemsService {

  constructor(
    private readonly categoryOrderItemRepository: CategoryOrderItemRepository
  ) { }
  async execute(): Promise<CategoryOrderItem[]> {
    return await this.categoryOrderItemRepository.findAll()
  }

}
