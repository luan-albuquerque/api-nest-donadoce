import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import CreateSessionService from './services/createSession.service';
import CreateSessionDTO from './dtos/CreateSessionDTO';

@ApiTags("Auth")
@Controller('session')
export class AuthController {
  constructor(
    private readonly createSessionService: CreateSessionService) { }

  @Post()
  @ApiOperation({ summary: "EndPoint para Login de usuarios", description: "Nescessario está cadastrado" })
  @ApiOkResponse({ status: 200, description: "Autenticado com sucesso" })
  async create(@Body() createSessionDTO: CreateSessionDTO) {

    return await this.createSessionService.execute(createSessionDTO);


  }

}
