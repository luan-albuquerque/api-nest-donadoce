import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './services/users.service';
import { CreateUserService } from './services/create-user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly createUserService: CreateUserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
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
