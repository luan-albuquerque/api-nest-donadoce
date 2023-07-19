import { Controller,Param, Post, Body, Put , Get,Query, DefaultValuePipe, ParseIntPipe, Delete} from '@nestjs/common';
import { CreateRevenuePerCompanyService } from './services/create-revenue-per-company.service';
import { PatchRevenuePerCompanyService } from './services/patch-revenue-per-company.service';
import { RemoveRevenuePerCompanyService } from './services/remove-revenue-per-company.service';
import { FindAllRevenuePerCompanyService } from './services/find-all-revenue-per-company.service';
import { CreateRevenuePerCompanyStatusDTO } from './dto/create-revenue-per-company.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateRevenuePerCompanyStatusDTO } from './dto/update-revenue-per-company-status.dto';

@Controller('revenue-per-company')
@ApiBearerAuth()
@ApiTags("RevenuePerCompany")
export class RevenuePerCompanyController {
  constructor(
    private readonly createRevenuePerCompanyService: CreateRevenuePerCompanyService,
    private readonly patchRevenuePerCompanyService: PatchRevenuePerCompanyService,
    private readonly removeRevenuePerCompanyService: RemoveRevenuePerCompanyService,
    private readonly findAllRevenuePerCompanyService: FindAllRevenuePerCompanyService
    ) {}

    
  @Post()
  @ApiOperation({ summary: "EndPoint para criar vinculo de receitas com receitas e definir valores especificos" })
  @ApiBody({
    type: CreateRevenuePerCompanyStatusDTO,
  })
  async create(@Body() createRevenuePerCompanyStatusDTO: CreateRevenuePerCompanyStatusDTO) {
    return await this.createRevenuePerCompanyService.execute(createRevenuePerCompanyStatusDTO);
  }

  @Put()
  @ApiOperation({ summary: "EndPoint para atualizar vinculo de receitas com receitas e definir valores especificos" })
  @ApiBody({
    type: UpdateRevenuePerCompanyStatusDTO,
  })
  async recreate(
    @Body() updateRevenuePerCompanyStatusDTO: UpdateRevenuePerCompanyStatusDTO) {
    return await this.patchRevenuePerCompanyService.execute(updateRevenuePerCompanyStatusDTO);
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
    @Query('company_corporate_name') company_corporate_name = undefined,
    @Query('description_revenue') description_revenue = undefined,
  ) {
    return await this.findAllRevenuePerCompanyService.execute({
     skip,
     take: limit,
     company_corporate_name,
     description_revenue
    });
  }

  @ApiOperation({ summary: "EndPoint para remover vinculo de receitas com receitas e definir valores especificos" })
  @Delete(':fk_revenue/:fk_company')
  async remove(
    @Param('fk_revenue') fk_revenue: string,
    @Param('fk_company') fk_company: string
    ) {
    await this.removeRevenuePerCompanyService.execute(fk_revenue, fk_company);
  }
}
