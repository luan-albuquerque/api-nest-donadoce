import { Controller,Param, Post, Body, Put , Get,Query, DefaultValuePipe, ParseIntPipe, Delete, Req, Patch} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindOneInforUserService } from './services/find-one-infor-user.service';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
import { UpdatePasswordService } from './services/update-password.service ';


@Controller('users')
@ApiBearerAuth()
@ApiTags("Users")
export class UsersController {
  constructor(
    private readonly findOneInforUserService: FindOneInforUserService,
    private readonly updatePasswordService: UpdatePasswordService
  ) {}

  @Get("my-data")
  @ApiOperation({ summary: "EndPoint para Listar Meus dados" })
  async findOne(@Req() req) {
    
    return await this.findOneInforUserService.execute(req.user.id)
  }

  @Patch("password")
  @ApiOperation({ summary: "Atualizar senha de cadastro" })
  async updatePassword(@Req() req, @Body() body: UpdatePasswordUserDto) {
  
    await this.updatePasswordService.execute(req.user.id, body);
  
  }


}
