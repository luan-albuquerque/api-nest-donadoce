import { Controller, Get, Patch, Body, Put, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FindShoppingListService } from './services/find-shopping-list.service';
import { ShoppingListDto } from './dtos/shoppinglist.dto';


@ApiTags("Dashboard")
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly findShoppingListService: FindShoppingListService
  ) { }

  @Patch("shoppingList")
  async ShoppingList(@Body() {
    client,
    orderStatus,
    orderType,
  }: ShoppingListDto) {
    return await this.findShoppingListService.execute(orderStatus, client, orderType);
  }

}
