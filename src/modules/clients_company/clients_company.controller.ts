import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, BadRequestException, Put } from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateClientCompany } from './dto/create-client-company.dto';
import FindAllClientCompanyService from './services/find-all-client-company.service';
import { PaginationOptions } from './dto/pagination-options.dto';
import FindOneByClientCompanyService from './services/find-one-by-client-company.service';
import { DeleteClientCompanyService } from './services/delete-client-company.service';
import { DeleteClientCompany } from './dto/delete-client-company.dto';
import CreateClientCompanyService from './services/create-client-company.service';
import { UpdateClientCompany } from './dto/update-client-company.dto';
import UpdateClientCompanyService from './services/update-client-company.service';

@ApiTags('Clients_company')
@ApiBearerAuth()
@Controller('clients_company')
export class ClientsCompanyController {
  constructor(
    private readonly createCompanyService: CreateClientCompanyService,
    private readonly findAllClientCompanyService: FindAllClientCompanyService,
    private readonly findOneByClientCompanyService: FindOneByClientCompanyService,
    private readonly deleteCompanyService: DeleteClientCompanyService,
    private readonly updateClientCompanyService: UpdateClientCompanyService,
  ) { }

  @ApiOperation({ summary: "Vincular uma unidade a um cliente criando um responsavél", description: "" })
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


  @ApiOperation({ summary: "Buscar todas as unidade de cliente X"})
  @Get(':fk_client')
  async findOneByClient(@Param('fk_client') fk_client: string) {
    return await this.findOneByClientCompanyService.execute(fk_client)
  }

  @ApiOperation({ summary: "Atualização de dados do vinculo de cliente e unidade."})
  @Put()
  async Update(@Body() data: UpdateClientCompany) {
      return await this.updateClientCompanyService.execute(data)

  }

 
  @ApiOperation({ summary: "Rota desativada"})
  @Delete()
  async remove(@Body() data: DeleteClientCompany) {
     throw new BadRequestException("Rota defasada devido a atualização de banco de dados em 04/2024")
      return await this.deleteCompanyService.execute(data)

  }
}
