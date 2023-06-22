import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import BCryptHashPassword from '../auth/providers/Hash/implementations/BCryptHashPassword';
import { expiresIn, secretClient } from 'src/config/jwt/config.jwt';
import { JwtModule } from '@nestjs/jwt';
import FindAllClientService from './services/find-all-client.service';
import FindOneClientService from './services/find-one-client.service';
import CreateClientService from './services/create-client.service';
import BCryptHash from './providers/implementations/BCryptHash';

@Module({
  imports: [DatabaseModule, 
    JwtModule.register({
    secret: secretClient,
    signOptions: {
      expiresIn: expiresIn
    }
  })],
  controllers: [ClientsController],
  providers: [
    CreateClientService,
    FindAllClientService, 
    FindOneClientService,
    BCryptHash,
    BCryptHashPassword,
  ]
})
export class ClientsModule { }
