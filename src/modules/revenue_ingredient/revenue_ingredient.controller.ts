import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRevenueIngredientDto } from './dto/create-revenue_ingredient.dto';
import { CreateRevenueIngredientService } from './services/create-revenue_ingredient.service';
import { DeleteRevenueIngredientDto } from './dto/delete-revenue_ingredient.dto';
import { DeleteRevenueIngredientService } from './services/delete-revenue_ingredient.service';
import { UpdateRevenueIngredientService } from './services/update-revenue_ingredient.service';
import { UpdateRevenueIngredientDto } from './dto/update-revenue_ingredient.dto';

@Controller('revenue-ingredient')
@ApiTags("Revenue-Ingredient")
@ApiBearerAuth()
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
  @ApiOperation({ summary: "EndPoint para adicionar ingrediente em receitas já existentes", description: "Voce poderá adicionar ingredientes já criados a uma receita existente, vocé não pode adicionar o mesmo ingrediente novamente na receita se o mesmo já existir nela"  })
  create(@Body() createRevenueIngredientDto: CreateRevenueIngredientDto[]) {
    return this.createRevenueIngredientService.execute(createRevenueIngredientDto);
  }

  @Patch()
  @ApiOperation({ summary: "EndPoint para atualizar a quantidade de ingredientes que está na receita.", description: "Obs: É possivel atualizar apenas quantidade presente na receita 'amount_ingredient' " })
  update(@Body() updateRevenueIngredientDto: UpdateRevenueIngredientDto) {
    return this.updateRevenueIngredientService.execute(updateRevenueIngredientDto);
  }

  @Delete()
  @ApiOperation({ summary: "EndPoint para deletar um ingredientes dentro da receita.", description: "Obs: É possivel atualizar apenas quantidade presente na receita 'amount_ingredient' " })
  remove(@Body() deleteRevenueIngredientDto: DeleteRevenueIngredientDto) {
    return this.deleteRevenueIngredientService.execute(deleteRevenueIngredientDto);
  }
}
