import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FindAllCategoryMenuItemsService } from './services/find-all-category-menu-items.service';
import { ApiOperation, ApiResponseProperty, ApiTags } from '@nestjs/swagger';

@ApiTags("CategoryMenuItems")
@Controller('category-menu-items')
export class CategoryMenuItemsController {
  constructor(private readonly findAllCategoryMenuItemsService: FindAllCategoryMenuItemsService) { }

  @Get()
  @ApiOperation({summary: "Listagem de Categorias"})
  @ApiResponseProperty({ type: [CategoryMenuItemsController]})
  async findAll() {
    return await this.findAllCategoryMenuItemsService.execute();
  }

}
