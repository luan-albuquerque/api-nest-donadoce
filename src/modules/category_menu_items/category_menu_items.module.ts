import { Module } from '@nestjs/common';
import { CategoryMenuItemsController } from './category_menu_items.controller';
import { FindAllCategoryMenuItemsService } from './services/find-all-category-menu-items.service';
import { DatabaseModule } from 'src/shared/config/database/database.module';

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [CategoryMenuItemsController],
  providers: [FindAllCategoryMenuItemsService]
})
export class CategoryMenuItemsModule {}
