import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DatabaseModule } from "src/shared/config/database/database.module";
import BCryptHashPassword from "./providers/Hash/implementations/BCryptHashPassword";
import CreateSessionService from "./services/createSession.service";
import { expiresIn, secret } from "src/config/jwt/config.jwt";
import { AuthController } from "./auth.controller";


@Module({
  imports:[DatabaseModule,
    JwtModule.register({
    secret: secret,
    signOptions:{
      expiresIn: expiresIn
    }
  }) ],
  controllers: [AuthController],
  providers: [CreateSessionService, BCryptHashPassword]
})
export class AuthModule {}
