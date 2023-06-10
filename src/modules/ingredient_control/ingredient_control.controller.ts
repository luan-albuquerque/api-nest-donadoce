import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngredientControlService } from './services/ingredient_control.service';
import { CreateIngredientControlDto } from './dto/create-ingredient_control.dto';
import { UpdateIngredientControlDto } from './dto/update-ingredient_control.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateIngredientFluxoService } from './services/create-ingredient-fluxo.service';
import { ListIngredientFluxoService } from './services/list-ingredient-fluxo.service';

@ApiTags("ControlIngredients")
@ApiBearerAuth()
@Controller('ingredient-control')
export class IngredientControlController {
  constructor(
    private readonly createIngredientFluxoService: CreateIngredientFluxoService,
    private readonly listIngredientFluxoService: ListIngredientFluxoService,
    ) {}

  @Post()
  async create(@Body() createIngredientControlDto: CreateIngredientControlDto) {
    await this.createIngredientFluxoService.execute(createIngredientControlDto);
    return { message: "Cadastrado com sucesso" };
  }

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
