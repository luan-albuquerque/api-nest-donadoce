import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { FindOneInforUserService } from './services/find-one-infor-user.service';
import { UsersController } from './users.controller';
import { UpdatePasswordService } from './services/update-password.service ';
import BCryptHashPassword from '../auth/providers/Hash/implementations/BCryptHashPassword';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [FindOneInforUserService, UpdatePasswordService,  
  BCryptHashPassword]
})
export class UsersModule { }
