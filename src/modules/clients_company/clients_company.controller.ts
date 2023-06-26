import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateClientCompany } from './dto/create-client-company.dto';
import FindAllClientCompanyService from './services/find-all-client-company.service';

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

  @ApiOperation({ summary: ""})
  @Get()
  async findAll() {

    return this.findAllClientCompanyService.execute()
  }


  @ApiOperation({ summary: ""})
  @Get(':fk_client')
  async findOneByClient() {
    return this.findAllClientCompanyService.execute()
  }

 
  @ApiOperation({ summary: ""})
  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}
