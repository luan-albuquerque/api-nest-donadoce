import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCompanyService } from './services/create-company.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllCompanyService } from './services/find-all-company.service';
import { FindOneCompanyService } from './services/find-one-company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdateCompanyService } from './services/update-company.service';
import { RemoveCompanyService } from './services/remove-company.service';

@ApiTags('Company')
@ApiBearerAuth()
@Controller('company')
export class CompanyController {
  constructor(
    private readonly createCompanyService: CreateCompanyService,
    private readonly findAllCompanyService: FindAllCompanyService,
    private readonly findOneCompanyService: FindOneCompanyService,
    private readonly updateCompanyService: UpdateCompanyService,
    private readonly removeCompanyService: RemoveCompanyService,

  ) { }

  @ApiOperation({ summary: "Criação de empresa vinclado a um cliente ", description: "O endpoint deve possuir um cliente exemplo: Ao criar Empresa Sansung, a mesma deve possuir o cliente Sodexo" })
  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.createCompanyService.execute(createCompanyDto);
  }

  @ApiOperation({ summary: "Lista de todas as empresas "})
  @Get()
  async findAll() {
    return await this.findAllCompanyService.execute();
  }

  @ApiOperation({ summary: "Buscar de empresa especifica "})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findOneCompanyService.execute(id);
  }

  @ApiOperation({ summary: "Atualizar dados de empresa especifica", description:'O endpoint deve atualizar apenas dados simples, observação o fk_client não esta incluso para nao ocorrer problemas de duplicidade'})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.updateCompanyService.execute(id, updateCompanyDto);
  }

  @ApiOperation({ summary: "Remover empresa especifica "})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeCompanyService.execute(id);
  }
}
