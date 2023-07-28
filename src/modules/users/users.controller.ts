import { Controller,Param, Post, Body, Put , Get,Query, DefaultValuePipe, ParseIntPipe, Delete, Req} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindOneInforUserService } from './services/find-one-infor-user.service';


@Controller('users')
@ApiBearerAuth()
@ApiTags("Users")
export class UsersController {
  constructor(
    private readonly findOneInforUserService: FindOneInforUserService
  ) {}

  @Get("my-data")
  @ApiOperation({ summary: "EndPoint para Listar Meus dados" })
  async findOne(@Req() req) {
    
    return await this.findOneInforUserService.execute(req.user.id)
  }


}
