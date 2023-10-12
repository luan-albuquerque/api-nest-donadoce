import { Controller, Get, Post,Patch, Body, Put, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import FindAllClientService from './services/find-all-client.service';
import FindOneClientService from './services/find-one-client.service';
import CreateClientService from './services/create-client.service';
import DeleteClientService from './services/delete-client.service';
import UpdateClientService from './services/update-client.service';
import { PaginationOptions } from './dto/pagination-options.dto';
@ApiTags("Clients")
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly findAllClientService: FindAllClientService,
    private readonly findOneClientService: FindOneClientService,
    private readonly createClientService: CreateClientService,
    private readonly deleteClientService:DeleteClientService,
    private readonly updateClientService: UpdateClientService
  ) { }


  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: "EndPoint para Criar Clients",
    description: "Nescessario está cadastrado",

  })
  // @ApiBody({ type: CreateClientDto })
  @ApiOkResponse({ status: 200, description: "Criado com sucesso" })
  async createClient(@Body() createClientDto: CreateClientDto) {

    await this.createClientService.execute(createClientDto);

    return { message: "Criado com sucesso" }

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
    name: 'corporate_name',
    required: false,
    type: String,
  })
  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: "EndPoint para Lista de Clients",
    description: "Nescessario ter token de sistema"
  })
  async findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('corporate_name') corporate_name,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
  ) {
    limit = limit > 10 ? 10 : limit;

    return await this.findAllClientService.execute({
      limit,
      skip,
      corporate_name
    });
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: "EndPoint para buscar de Client",
    description: "Nescessario ter token de sistema"
  })
  findOne(@Param('id') id: string) {
    return this.findOneClientService.execute(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: "EndPoint para atualizar Cliente",
    description: "Atualiza apenas dados do cliente e usuario"
  })
  @ApiBody({type: UpdateClientDto})
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.updateClientService.execute(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "EndPoint para deletar  Client",
    description: "Deleta Cliente, Empresas assosiadas nele e usuario de login de acesso"
  })
  remove(@Param('id') id: string) {
    return this.deleteClientService.execute(id);
  }



}
