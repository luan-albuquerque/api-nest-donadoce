import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { FindShoppingListService } from './services/find-shopping-list.service';
import { DashboardController } from './dashboard.controller';


@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [
    DashboardController
  ],
  providers: [
    FindShoppingListService
  ]
})
export class DashboardModule {}
