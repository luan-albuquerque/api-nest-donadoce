import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngredientControlService } from './services/ingredient_control.service';
import { CreateIngredientControlDto } from './dto/create-ingredient_control.dto';
import { UpdateIngredientControlDto } from './dto/update-ingredient_control.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateIngredientFluxoService } from './services/create-ingredient-fluxo.service';
import { ListIngredientFluxoService } from './services/list-ingredient-fluxo.service';

@ApiTags("Control-Ingredients")
@ApiBearerAuth()
@Controller('ingredient-control')
export class IngredientControlController {
  constructor(
    private readonly createIngredientFluxoService: CreateIngredientFluxoService,
    private readonly listIngredientFluxoService: ListIngredientFluxoService,
    ) {}

  @ApiOperation({ summary: "EndPoint Para criar entrada e saida de material no estoque" ,description: "O endpoint modifica o valor atual dentro da tabelas ingredientes que contem o preço atual de acordo com entrada e saida de ingredientes" })
  @Post()
  async create(@Body() createIngredientControlDto: CreateIngredientControlDto) {
    await this.createIngredientFluxoService.execute(createIngredientControlDto);
    return { message: "Cadastrado com sucesso" };
  }

  @ApiOperation({ summary: "EndPoint Para list ingredientes com historico de entrada e saida " ,description: "O endpoint lista o historico caso o control esteja com 'true' e oculta o historico caso esteja com 'false'" })
  @Get(':control')
  async findAll(@Param('control') control: boolean) {
    return await this.listIngredientFluxoService.execute(String(control));
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ingredientControlService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateIngredientControlDto: UpdateIngredientControlDto) {
  //   return this.ingredientControlService.update(+id, updateIngredientControlDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ingredientControlService.remove(+id);
  // }
}
