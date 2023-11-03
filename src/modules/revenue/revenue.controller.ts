import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Request, Put, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';;
import { CreateRevenueService } from './services/create-revenue.service';
import {
  ApiBearerAuth,
  ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags,
} from '@nestjs/swagger';
import { FindAllRevenueService } from './services/find-all-revenue.service';
import { FindOneRevenueWithIngredientService } from './services/find-one-revenue-with-ingredients.service';
import { DeleteRevenueService } from './services/delete-revenue.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/shared/http/middlewares/multerRevenue.middleware';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueService } from './services/update-revenue.service';
import { UpdateRevenueDto } from './dto/update-revenue.dto';
import { FindAllRevenuesSummarizedService } from './services/find-all-revenues-summarized.service';
import { FindAllRevenuesNotMenuService } from './services/find-all-revenues-not-menu.service';
@Controller('revenue')
@ApiTags("Revenue")
@ApiBearerAuth()

export class RevenueController {
  constructor(
    private readonly createRevenueService: CreateRevenueService,
    private readonly findAllRevenueService: FindAllRevenueService,
    private readonly findOneRevenueWithIngredientService: FindOneRevenueWithIngredientService,
    private readonly deleteRevenueService: DeleteRevenueService,
    private readonly updateRevenueService: UpdateRevenueService,
    private readonly findAllRevenuesSummarizedService: FindAllRevenuesSummarizedService,
    private readonly findAllRevenuesNotMenuService: FindAllRevenuesNotMenuService
  ) { }

  @Post()
  @ApiOperation({ summary: "EndPoint de Criar receita com ou sem ingredientes compostos nela.", description: "Obs: No campo ingredients deve se criar apena um item que vai ser um array dentro, o que deve ser manipulado são os seus objetos, dependendo da quantidade de igredientes, deve ser criado um objeto e adicionardo fk_ingredient que no caso é o id do ingrediente e amount_ingredient que é a quantidade relativa a aquele ingrediente" })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imagem', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateRevenueDto,
  })
  async create(
    @Body() body: CreateRevenueDto,
    @UploadedFiles() files: any,
  ) {

    const imagem = files ? files.imagem ? files.imagem[0].filename : null : null;
    const bodyform = Object(body)

    const newData: CreateRevenueDto = {
      imagem,
      base_max_amount: Number(bodyform.base_max_amount),
      base_min_amount: Number(bodyform.base_min_amount),
      description: bodyform.description,
      value: Number(bodyform.value),
      yield_per_quantity: Number(bodyform.yield_per_quantity),
      time_in_hours: Number(bodyform.time_in_hours),
      presumed_profit: Number(bodyform.presumed_profit),
      ingredients: bodyform.ingredients,
      status: Number(bodyform.status)
    }

    return await this.createRevenueService.execute(newData)

  }
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
    name: 'description',
    required: false,
    type: String,
  })
  @ApiOperation({ summary: "EndPoint de listagem de todas as receitas.", description: "Obs: Listagem geral resumida " })
  @Get()
  async findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
    @Query('description') description = undefined,
  ) {
    return await this.findAllRevenueService.execute({
      description,
      skip,
      take: limit
    });
  }

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
    name: 'description',
    required: false,
    type: String,
  })
  @ApiOperation({ summary: "EndPoint de listagem de todas as receitas de forma resumida.", description: "Obs: Listagem geral resumida " })
  @Get("v2")
  async findAllSummarized(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
    @Query('description') description = undefined,
  ) {
    return await this.findAllRevenuesSummarizedService.execute({
      description,
      skip,
      take: limit
    });
  }

  @ApiQuery({
    name: 'fk_menu',
    required: false,
    type: String,
  })
  @ApiOperation({ summary: "EndPoint de listagem de todas as receitas de fora do menu", description: " " })
  @Get("notMenu/:fk_menu")
  async findAllNotMenu(
    @Query('fk_menu') fk_menu = undefined,
  ) {
    return await this.findAllRevenuesNotMenuService.execute(fk_menu);
  }


  @ApiOperation({ summary: "EndPoint de listagem de receita especifica com todos os ingredientes compostos nela.", description: "Obs: Ignora dados dentro de item 'ingredient' usar apenas a descrição e id " })
  @Get('ingredients/:id')
  async findOne(@Param('id') id: string) {

    return await this.findOneRevenueWithIngredientService.execute(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.revenueService.findOne(+id);
  // }

  @ApiOperation({ summary: "EndPoint de atualizar apenas dados da receita .", description: "Obs: Ingredientes deve ser atualizador pela rota 'revenues-ingredients' " })
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imagem', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateRevenueDto,
  })
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: any,
    @Body() updateRevenueDto: UpdateRevenueDto
  ) {

    const imagem = files.imagem ? files.imagem[0].filename : null;
    const bodyform = Object(updateRevenueDto)

    const newData: UpdateRevenueDto = {
      imagem,
      description: bodyform.description,
      status: bodyform.status,
      value: Number(bodyform.value),
      old_imagem: bodyform.old_imagem,
      yield_per_quantity: Number(bodyform.yield_per_quantity),
      time_in_hours: Number(bodyform.time_in_hours),
      presumed_profit: Number(bodyform.presumed_profit)
    }
    await this.updateRevenueService.execute(id, newData)
  }

  @Delete(':fk_revenue')
  @ApiOperation({ summary: "EndPoint de deletar receita com todos os ingredientes compostos nela.", description: "" })
  async remove(@Param('fk_revenue') fk_revenue: string) {
    await this.deleteRevenueService.execute(fk_revenue);
  }
}
