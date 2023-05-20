import { Controller, Get, Post, Body, Put         , Param, Delete, Query, DefaultValuePipe,ParseIntPipe } from '@nestjs/common';

import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { CreateIngredientsService } from './services/create-ingredients.service';
import { UpdateIngredientsService } from './services/update-ingredients.service';
import { FindAllIngredientsService } from './services/find-all-ingredients.service';
import { FindOneIngredientsService } from './services/find-one-ingredients.service';
import { DeleteIngredientsService } from './services/delete-ingredients.service';
import { PaginationOptions } from './dto/pagination-options.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Ingredients")
@ApiBearerAuth()
@Controller('ingredients')
export class IngredientsController {
  constructor(
    private readonly createIngredientsService: CreateIngredientsService,
    private readonly updateIngredientsService: UpdateIngredientsService,
    private readonly findAllIngredientsService: FindAllIngredientsService,
    private readonly findOneIngredientsService: FindOneIngredientsService,
    private readonly deleteIngredientsService: DeleteIngredientsService,
    ) {}

  @Post()
  @ApiOperation({ summary: "EndPoint para criação de ingredientes", description: "Nescessario niveis administrador e (a definir)" })
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.createIngredientsService.execute(createIngredientDto);
  }

  @Get()
  @ApiOperation({ summary: "EndPoint para listagem de todos os ingredientes", description: "Nescessario niveis administrador e (a definir)" })
  async findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
  ) {
    limit = limit > 10 ? 10 : limit;
    return await this.findAllIngredientsService.execute({limit, skip});
  }
  @ApiOperation({ summary: "EndPoint para buscar de ingrediente especifico por identificador", description: "Nescessario niveis administrador e (a definir)" })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneIngredientsService.execute(id);
  }

  @ApiOperation({ summary: "EndPoint para atualizar ingrediente especifico por identificador", description: "Nescessario niveis administrador e (a definir)" })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    return this.updateIngredientsService.execute(id, updateIngredientDto);
  }

  @ApiOperation({ summary: "EndPoint para remover ingrediente especifico por identificador", description: "Nescessario niveis administrador e (a definir)" })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.deleteIngredientsService.execute(id);
  }
}
