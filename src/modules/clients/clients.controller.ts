import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import CreateSessionClientService from './services/create-session-client.service';
import CreateSessionDTO from './dto/CreateSessionDTO';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import FindAllClientService from './services/find-all-client.service';
import FindOneClientService from './services/find-one-client.service';
import CreateClientService from './services/create-client.service';
@ApiTags("Clients")
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly createSessionClientService: CreateSessionClientService,
    private readonly findAllClientService: FindAllClientService,
    private readonly findOneClientService: FindOneClientService,
    private readonly createClientService: CreateClientService
  ) { }


  @Post('auth')
  @ApiOperation({
    summary: "EndPoint para Login de Clients",
    description: "Nescessario está cadastrado"
  })
  @ApiBody({ type: CreateSessionDTO })
  @ApiOkResponse({ status: 200, description: "Autenticado com sucesso" })
  async createSessionClient(@Body() createSessionDTO: CreateSessionDTO) {

    return await this.createSessionClientService.execute(createSessionDTO);

  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: "EndPoint para Criar Clients",
    description: "Nescessario está cadastrado"
  })
  @ApiBody({ type: CreateClientDto })
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
  //   return this.clientsService.update(+id, updateClientDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.clientsService.remove(+id);
  // }
}
