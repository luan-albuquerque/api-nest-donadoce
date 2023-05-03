import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { CreateUserService } from './services/create-user.service';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import BCryptHash from './providers/implementations/BCryptHash';

@Module({
  imports:[DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, CreateUserService,BCryptHash]
})
export class UsersModule {}
