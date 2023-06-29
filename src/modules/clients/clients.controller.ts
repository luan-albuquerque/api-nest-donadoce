import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import FindAllClientService from './services/find-all-client.service';
import FindOneClientService from './services/find-one-client.service';
import CreateClientService from './services/create-client.service';
import DeleteClientService from './services/delete-client.service';
import UpdateClientService from './services/update-client.service';
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

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: "EndPoint para Lista de Clients",
    description: "Nescessario ter token de sistema"
  })
  async findAll() {
    return await this.findAllClientService.execute();
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
  @ApiBody({type: UpdateClientDto})
  @ApiOperation({
    summary: "EndPoint para atualizar  Client",
    description: "Atualiza apenas dados do cliente e usuario"
  })
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
