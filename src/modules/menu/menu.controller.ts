import { Controller, Get, Post, Body, Put, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { CreateMenuService } from './services/create-menu.service';
import { FindAllMenuService } from './services/find-all-menu.service';
import { FindOneMenuService } from './services/find-one-menu.service';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RemoveOneMenuService } from './services/remove-one-menu.service';
import { RecreateMenuDto } from './dto/recreate-menu.dto';
import { RecreateMenuService } from './services/recreate-menu.service';

@ApiTags("Menu")
@ApiBearerAuth()
@Controller('menu')
export class MenuController {
  constructor(
    private readonly createMenuService: CreateMenuService,
    private readonly findAllMenuService: FindAllMenuService,
    private readonly findOneMenuService: FindOneMenuService,
    private readonly removeOneMenuService: RemoveOneMenuService,
    private readonly recreateMenuService: RecreateMenuService
    ) {}

  @Post()
  @ApiBody({
    type: CreateMenuDto,
  })
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.createMenuService.execute(createMenuDto);
  }

  @Put(":id")
  @ApiBody({
    type: RecreateMenuDto,
  })
  async recreate(
    @Param('id') id: string,
    @Body() recreateMenuDto: RecreateMenuDto) {
    return await this.recreateMenuService.execute(id, recreateMenuDto);
  }

  @Get()
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'date',
    required: false,
    type: Date,
  })
  @ApiQuery({
    name: 'itensMenu',
    required: false,
    type: Boolean,
  })
  async findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
    @Query('date') date = undefined,
    @Query('itensMenu') itensMenu = false,
  ) {
    return await this.findAllMenuService.execute({
     skip,
     take: limit,
     itensMenu,
     dateMenu: date
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findOneMenuService.execute(id);
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.removeOneMenuService.execute(id);
  }
}
