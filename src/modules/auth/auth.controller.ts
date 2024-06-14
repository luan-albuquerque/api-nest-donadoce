import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import CreateSessionService from './services/createSession.service';
import CreateSessionDTO from './dtos/CreateSessionDTO';
import SendEmailWithTokenDTO from './dtos/SendEmailWithTokenDTO';
import SendEmailWithTokenService from "./services/sendEmailWithToken.service";
import Token from './entities/Token';
import RedefinePasswordDTO from './dtos/RedefinePasswordDTO';
import RedefinePasswordService from './services/redefinePassword.service';

@ApiTags("Auth")
@Controller('session')
export class AuthController {
  constructor(
    private readonly createSessionService: CreateSessionService,
    private readonly sendEmailWithTokenService: SendEmailWithTokenService,
    private readonly redefinePasswordService: RedefinePasswordService,
  ) { }

  @Post()
  @ApiOperation({ summary: "Endpoint para login de usuários", description: "Necessário estar cadastrado" })
  @ApiBody({ type: CreateSessionDTO })
  @ApiOkResponse({ status: 200, description: "Autenticado com sucesso" })
  async create(@Body() createSessionDTO: CreateSessionDTO) {
    return await this.createSessionService.execute(createSessionDTO);
  }

  @Post("send-email")
  @ApiOperation({ summary: "Endpoint de recuperação de senha", description: "Necessário estar cadastrado" })
  @ApiBody({ type: SendEmailWithTokenDTO })
  async sendEmailWithToken(@Body() { email }: SendEmailWithTokenDTO): Promise<Token> {
    return await this.sendEmailWithTokenService.execute({ email });
  }

  @Post("redefine-password")
  @ApiOperation({ summary: "Endpoint de redefinição de senha", description: "Necessário estar cadastrado" })
  @ApiBody({ type: RedefinePasswordDTO })
  async redefinePassword(@Body() { token, confirmpassword, password }: RedefinePasswordDTO): Promise<void> {
    await this.redefinePasswordService.execute({ token, confirmpassword, password });
  }
}
