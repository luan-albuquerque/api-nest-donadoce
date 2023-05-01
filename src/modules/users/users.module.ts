import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { CreateUserService } from './services/create-user.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CreateUserService]
})
export class UsersModule {}
