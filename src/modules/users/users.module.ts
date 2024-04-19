import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { FindOneInforUserService } from './services/find-one-infor-user.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [FindOneInforUserService]
})
export class UsersModule { }
