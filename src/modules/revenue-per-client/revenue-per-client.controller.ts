import { Controller,Param, Post, Body, Put , Get,Query, DefaultValuePipe, ParseIntPipe, Delete} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateRevenuePerClientService } from './services/create-revenue-per-client.service';
import { CreateRevenuePerClientStatusDTO } from './dto/create-revenue-per-client.dto';
import { UpdateRevenuePerClientStatusDTO } from './dto/update-revenue-per-client-status.dto';
import { PatchRevenuePerClientService } from './services/patch-revenue-per-client.service';
import { RemoveRevenuePerClientService } from './services/remove-revenue-per-client.service';
import { FindAllRevenuePerClientService } from './services/find-all-revenue-per-client.service';

@Controller('revenue-per-client')
@ApiBearerAuth()
@ApiTags("RevenuePerClient")
export class RevenuePerCompanyController {
  constructor(
    private readonly createRevenuePerClientService: CreateRevenuePerClientService,
    private readonly patchRevenuePerClientService: PatchRevenuePerClientService,
    private readonly removeRevenuePerClientService: RemoveRevenuePerClientService,
    private readonly findAllRevenuePerClientService: FindAllRevenuePerClientService
    ) {}

    
  @Post()
  @ApiOperation({ summary: "EndPoint para criar vinculo de receitas com receitas e definir valores especificos" })
  @ApiBody({
    type: CreateRevenuePerClientStatusDTO,
  })
  async create(@Body() createRevenuePerClientStatusDTO: CreateRevenuePerClientStatusDTO) {
    return await this.createRevenuePerClientService.execute(createRevenuePerClientStatusDTO);
  }

  @Put()
  @ApiOperation({ summary: "EndPoint para atualizar vinculo de receitas com receitas e definir valores especificos" })
  @ApiBody({
    type: UpdateRevenuePerClientStatusDTO,
  })
  async recreate(
    @Body() updateRevenuePerClientStatusDTO: UpdateRevenuePerClientStatusDTO) {
    return await this.patchRevenuePerClientService.execute(updateRevenuePerClientStatusDTO);
  }

  @Get()
  @ApiOperation({ summary: "EndPoint para listar vinculos de receitas com receitas e definir valores especificos" })
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
    name: 'company_corporate_name',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'description_revenue',
    required: false,
    type: String,
  })
  
  async findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
    @Query('client_corporate_name') client_corporate_name = undefined,
    @Query('description_revenue') description_revenue = undefined,
  ) {
    return await this.findAllRevenuePerClientService.execute({
     skip,
     take: limit,
     client_corporate_name,
     description_revenue
    });
  }

  @ApiOperation({ summary: "EndPoint para remover vinculo de receitas com receitas e definir valores especificos" })
  @Delete(':fk_revenue/:fk_company')
  async remove(
    @Param('fk_revenue') fk_revenue: string,
    @Param('fk_client') fk_client: string
    ) {
    await this.removeRevenuePerClientService.execute(fk_revenue, fk_client);
  }
}
