import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FindAllCategoryMenuItemsService } from './services/find-all-category-menu-items.service';
import { ApiOperation, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { FindAllRevenueOfMenuByCategoryService } from './services/find-all-revenue-of-menu-by-category.service';

@ApiTags("CategoryMenuItems")
@Controller('category-menu-items')
export class CategoryMenuItemsController {
  constructor(
    private readonly findAllCategoryMenuItemsService: FindAllCategoryMenuItemsService,
    private readonly findAllRevenueOfMenuByCategoryService: FindAllRevenueOfMenuByCategoryService
  ) { }

  @Get("findAllRevenueOfMenuByCategory/:fk_menu")
  @ApiOperation({ summary: "Listagem de Receitas de menu especifico por categoria" })
  @ApiResponseProperty({ type: [CategoryMenuItemsController] })
  async findAllRevenueOfMenuByCategory(@Param('fk_menu') fk_menu: string) {
    return await this.findAllRevenueOfMenuByCategoryService.execute(fk_menu);
  }

  @Get()
  @ApiOperation({ summary: "Listagem de Categorias" })
  @ApiResponseProperty({ type: [CategoryMenuItemsController] })
  async findAll() {
    return await this.findAllCategoryMenuItemsService.execute();
  }


}
