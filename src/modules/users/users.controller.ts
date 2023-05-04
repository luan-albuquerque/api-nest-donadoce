import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './services/users.service';
import { CreateUserService } from './services/create-user.service';
import { ApiOkResponse, ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FindAllUserService } from './services/find-all-user.service';
import { User } from './entities/user.entity';

@ApiTags("Users")
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly findAllUserService: FindAllUserService,
    private readonly createUserService: CreateUserService
  ) { }

  @Post()
  @ApiOperation({ summary: "EndPoint para criação de usuarios", description: "Nescessario nivel administrador" })
  @ApiOkResponse({ status: 201, description: "Criado com sucesso" })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.createUserService.execute(createUserDto);
    return { message: "Cadastrado com sucesso" };

  }

  @Get()
  @ApiOperation({ summary: "EndPoint para listagem de usuarios" })
  @ApiOkResponse({ type: User })
  async findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
  ) {
    limit = limit > 10 ? 10 : limit;
    
    return await this.findAllUserService.execute({limit, skip});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
