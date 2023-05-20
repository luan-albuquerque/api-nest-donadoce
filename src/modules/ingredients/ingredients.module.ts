import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { CreateIngredientsService } from './services/create-ingredients.service';
import { FindAllIngredientsService } from './services/find-all-ingredients.service';
import { FindOneIngredientsService } from './services/find-one-ingredients.service';
import { UpdateIngredientsService } from './services/update-ingredients.service';
import { DeleteIngredientsService } from './services/delete-ingredients.service';

@Module({
  imports:[DatabaseModule],
  controllers: [IngredientsController],
  providers: [
    CreateIngredientsService, 
    FindAllIngredientsService,
    FindOneIngredientsService,
    UpdateIngredientsService,
    DeleteIngredientsService
  ]
})
export class IngredientsModule {}
