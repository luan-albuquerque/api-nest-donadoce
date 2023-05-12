import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DatabaseModule } from "src/shared/config/database/database.module";
import BCryptHashPassword from "./providers/Hash/implementations/BCryptHashPassword";
import CreateSessionService from "./services/createSession.service";
import { expiresIn, secret } from "src/config/jwt/config.jwt";
import { AuthController } from "./auth.controller";
import { ConfigModule } from "@nestjs/config";
import SendEmailWithTokenService from "./services/sendEmailWithToken.service";
import SendEmailWithTokenForRecoverPasswordService from "../mail/services/sendMailToken.service";
import SendEmailConfirmRecoverPasswordService from "../mail/services/sendEmailConfirmRecoveyPassword.service";
import RedefinePasswordService from "./services/redefinePassword.service";


@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    JwtModule.register({
      secret: secret,
      signOptions: {
        expiresIn: expiresIn
      }
    })],
  controllers: [AuthController],
  providers: [
    // Serviços do Auth
    CreateSessionService, 
    RedefinePasswordService,
    // Serviços Externos
    SendEmailWithTokenForRecoverPasswordService, 
    SendEmailConfirmRecoverPasswordService,
    SendEmailWithTokenService, 
    // Crypit
    BCryptHashPassword
  ]
})
export class AuthModule { }
