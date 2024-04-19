import { Module } from '@nestjs/common';
import { RevenueIngredientController } from './revenue_ingredient.controller';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { CreateRevenueIngredientService } from './services/create-revenue_ingredient.service';
import { DeleteRevenueIngredientService } from './services/delete-revenue_ingredient.service';
import { UpdateRevenueIngredientService } from './services/update-revenue_ingredient.service';

@Module({
  imports:[DatabaseModule],
  controllers: [RevenueIngredientController],
  providers: [
    CreateRevenueIngredientService, 
    DeleteRevenueIngredientService, 
    UpdateRevenueIngredientService
  ]
})
export class RevenueIngredientModule {}
