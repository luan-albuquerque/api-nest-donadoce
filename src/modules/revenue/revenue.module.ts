import { Module } from '@nestjs/common';
import { RevenueController } from './revenue.controller';
import { CreateRevenueService } from './services/create-revenue.service';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { FindAllRevenueService } from './services/find-all-revenue.service';
import { FindOneRevenueWithIngredientService } from './services/find-one-revenue-with-ingredients.service';
import { DeleteRevenueService } from './services/delete-revenue.service';
import { UpdateRevenueService } from './services/update-revenue.service';
import { FindAllRevenuesSummarizedService } from './services/find-all-revenues-summarized.service';
import { FindAllRevenuesNotMenuService } from './services/find-all-revenues-not-menu.service';


@Module({
  imports:[DatabaseModule],
  controllers: [RevenueController],
  providers: [
    FindAllRevenuesSummarizedService,
    CreateRevenueService, 
    FindAllRevenueService, 
    FindOneRevenueWithIngredientService, 
    DeleteRevenueService,
    UpdateRevenueService,
    FindAllRevenuesNotMenuService
  ]

})
export class RevenueModule {}
