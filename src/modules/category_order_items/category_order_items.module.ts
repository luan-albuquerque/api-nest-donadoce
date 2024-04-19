import { Module } from '@nestjs/common';
import { CategoryOrderItemsController } from './category_order_items.controller';
import { FindAllCategoryMenuItemsService } from './services/find-all-category-menu-items.service';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { FindAllRevenueOfMenuByCategoryService } from './services/find-all-revenue-of-menu-by-category.service';

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [CategoryOrderItemsController],
  providers: [
    FindAllCategoryMenuItemsService, 
    FindAllRevenueOfMenuByCategoryService
  ]
})
export class CategoryOrderItemsModule {}
