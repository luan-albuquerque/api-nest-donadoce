import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateRevenueIngredientDto } from './dto/create-revenue_ingredient.dto';
import { CreateRevenueIngredientService } from './services/create-revenue_ingredient.service';
import { DeleteRevenueIngredientDto } from './dto/delete-revenue_ingredient.dto';
import { DeleteRevenueIngredientService } from './services/delete-revenue_ingredient.service';
import { UpdateRevenueIngredientService } from './services/update-revenue_ingredient.service';
import { UpdateRevenueIngredientDto } from './dto/update-revenue_ingredient.dto';

@Controller('revenue-ingredient')
@ApiTags("Revenue-Ingredient")
export class RevenueIngredientController {
  constructor(
    private readonly createRevenueIngredientService: CreateRevenueIngredientService,
    private readonly deleteRevenueIngredientService: DeleteRevenueIngredientService,
    private readonly updateRevenueIngredientService: UpdateRevenueIngredientService

    ) {}

  @Post()
  @ApiBody({
    isArray: true,
    type: CreateRevenueIngredientDto
  })
  create(@Body() createRevenueIngredientDto: CreateRevenueIngredientDto[]) {
    return this.createRevenueIngredientService.execute(createRevenueIngredientDto);
  }

  @Patch()
  update(@Body() updateRevenueIngredientDto: UpdateRevenueIngredientDto) {
    return this.updateRevenueIngredientService.execute(updateRevenueIngredientDto);
  }

  @Delete()
  remove(@Body() deleteRevenueIngredientDto: DeleteRevenueIngredientDto) {
    return this.deleteRevenueIngredientService.execute(deleteRevenueIngredientDto);
  }
}
