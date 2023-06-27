import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateClientCompany } from './dto/create-client-company.dto';
import FindAllClientCompanyService from './services/find-all-client-company.service';
import { PaginationOptions } from './dto/pagination-options.dto';
import FindOneByClientCompanyService from './services/find-one-by-client-company.service';
import { DeleteClientCompanyService } from './services/delete-client-company.service';
import { DeleteClientCompany } from './dto/delete-client-company.dto';
import CreateClientCompanyService from './services/create-client-company.service';

@ApiTags('Clients_company')
@ApiBearerAuth()
@Controller('clients_company')
export class ClientsCompanyController {
  constructor(
    private readonly createCompanyService: CreateClientCompanyService,
    private readonly findAllClientCompanyService: FindAllClientCompanyService,
    private readonly findOneByClientCompanyService: FindOneByClientCompanyService,
    private readonly deleteCompanyService: DeleteClientCompanyService,
  ) { }

  @ApiOperation({ summary: "", description: "" })
  
  @Post()
  @ApiBody({type:[CreateClientCompany]})
  async create(@Body() createClientCompany: CreateClientCompany[]) {
    await this.createCompanyService.execute(createClientCompany)
  }

  @ApiOperation({ summary: "Lista de Clientes e Empresas"})
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
  @Get()
  async findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
  ) {
    limit = limit > 10 ? 10 : limit; 

    return this.findAllClientCompanyService.execute({skip,limit})
  }


  @ApiOperation({ summary: ""})
  @Get(':fk_client')
  async findOneByClient(@Param('fk_client') fk_client: string) {
    return await this.findOneByClientCompanyService.execute(fk_client)
  }

 
  @ApiOperation({ summary: ""})
  @Delete()
  async remove(@Body() data: DeleteClientCompany) {
    return await this.deleteCompanyService.execute(data)

  }
}
