import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { CreateMenuService } from './services/create-menu.service';
import { FindAllMenuService } from './services/find-all-menu.service';
import { FindOneMenuService } from './services/find-one-menu.service';
import { RemoveOneMenuService } from './services/remove-one-menu.service';

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [MenuController],
  providers: [
    CreateMenuService,
    FindAllMenuService,
    FindOneMenuService,
    RemoveOneMenuService,
  ]
})
export class MenuModule {}
