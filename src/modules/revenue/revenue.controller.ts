import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Request, Put } from '@nestjs/common';;
import { CreateRevenueService } from './services/create-revenue.service';
import {
  ApiBearerAuth,
ApiBody, ApiConsumes, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { FindAllRevenueService } from './services/find-all-revenue.service';
import { FindOneRevenueWithIngredientService } from './services/find-one-revenue-with-ingredients.service';
import { DeleteRevenueService } from './services/delete-revenue.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/shared/http/middlewares/multerRevenue.middleware';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueService } from './services/update-revenue.service';
import { UpdateRevenueDto } from './dto/update-revenue.dto';
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
    ) {}

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
    
    const imagem =  files ? files.imagem ? files.imagem[0].filename : null : null;
    const bodyform = Object(body)
    
    const newData: CreateRevenueDto =  {
      imagem,
      description: bodyform.description,
      value: Number(bodyform.value),
      yield_per_quantity :Number(bodyform.yield_per_quantity),
      time_in_hours  :Number(bodyform.time_in_hours),
      presumed_profit :Number(bodyform.presumed_profit),
      ingredients: bodyform.ingredients
    }
 
    return await this.createRevenueService.execute(newData)
    
  }

  @ApiOperation({ summary: "EndPoint de listagem de todas as receitas.", description: "Obs: Listagem geral resumida " })
  @Get()
  async findAll() {
    return await this.findAllRevenueService.execute();
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

    const imagem =  files.imagem ? files.imagem[0].filename : null;
    const bodyform = Object(updateRevenueDto)
    
    const newData: UpdateRevenueDto =  {
      imagem,
      description: bodyform.description,
      value: Number(bodyform.value),
      old_imagem: bodyform.old_imagem,
      yield_per_quantity :Number(bodyform.yield_per_quantity),
      time_in_hours  :Number(bodyform.time_in_hours),
      presumed_profit :Number(bodyform.presumed_profit)
    }
    await this.updateRevenueService.execute(id, newData)
  }

  @Delete()
  @ApiOperation({ summary: "EndPoint de deletar receita com todos os ingredientes compostos nela.", description: ""})
  remove(@Param('fk_revenue') fk_revenue: string) {
    return this.deleteRevenueService.execute(fk_revenue);
  }
}
