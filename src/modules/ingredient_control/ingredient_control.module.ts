import { Module } from '@nestjs/common';
import { IngredientControlService } from './services/ingredient_control.service';
import { IngredientControlController } from './ingredient_control.controller';
import { CreateIngredientFluxoService } from './services/create-ingredient-fluxo.service';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { ListIngredientFluxoService } from './services/list-ingredient-fluxo.service';

@Module({
  imports: [DatabaseModule],
  controllers: [IngredientControlController],
  providers: [CreateIngredientFluxoService, ListIngredientFluxoService]
})
export class IngredientControlModule {}
