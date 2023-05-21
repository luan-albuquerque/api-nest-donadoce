import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';;
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';
import { RevenueService } from './services/revenue.service';
import { CreateRevenueService } from './services/create-revenue.service';
import {
ApiBody, ApiTags,
} from '@nestjs/swagger';
import { FindAllRevenueService } from './services/find-all-revenue.service';
import { FindOneRevenueWithIngredientService } from './services/find-one-revenue-with-ingredients.service';
@Controller('revenue')
@ApiTags("Revenue")
export class RevenueController {
  constructor(
    private readonly createRevenueService: CreateRevenueService,
    private readonly findAllRevenueService: FindAllRevenueService,
    private readonly findOneRevenueWithIngredientService: FindOneRevenueWithIngredientService
    ) {}

  @Post()
  @ApiBody({
    type: CreateRevenueDto
  })
  async create(@Body() createRevenueDto: CreateRevenueDto) {
    return await this.createRevenueService.execute(createRevenueDto);
  }

  @Get()
  async findAll() {
    return await this.findAllRevenueService.execute();
  }

  @Get('ingredients/:id')
  async findOne(@Param('id') id: string) {
    
    return await this.findOneRevenueWithIngredientService.execute(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.revenueService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRevenueDto: UpdateRevenueDto) {
  //   return this.revenueService.update(+id, updateRevenueDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.revenueService.remove(+id);
  // }
}
