import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateClientCompany } from './dto/create-client-company.dto';
import FindAllClientCompanyService from './services/find-all-client-company.service';
import { PaginationOptions } from './dto/pagination-options.dto';

@ApiTags('Clients_company')
@ApiBearerAuth()
@Controller('clients_company')
export class ClientsCompanyController {
  constructor(
    private readonly findAllClientCompanyService: FindAllClientCompanyService
  ) { }

  @ApiOperation({ summary: "", description: "" })
  @Post()
  async create(@Body() createClientCompany: CreateClientCompany) {
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
  async findOneByClient() {
    return ""
  }

 
  @ApiOperation({ summary: ""})
  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}
