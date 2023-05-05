import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { CreateUserService } from './services/create-user.service';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import BCryptHash from './providers/implementations/BCryptHash';
import { FindAllUserService } from './services/find-all-user.service';
import { UpdateUserService } from './services/update-user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, CreateUserService, FindAllUserService, UpdateUserService, BCryptHash]
})
export class UsersModule { }
