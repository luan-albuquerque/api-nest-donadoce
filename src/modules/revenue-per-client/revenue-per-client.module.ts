import { Module } from '@nestjs/common';
import { RevenuePerClientController  } from './revenue-per-client.controller';
import { CreateRevenuePerClientService } from './services/create-revenue-per-client.service';
import { PatchRevenuePerClientService } from './services/patch-revenue-per-client.service';
import { RemoveRevenuePerClientService } from './services/remove-revenue-per-client.service';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { FindAllRevenuePerClientService } from './services/find-all-revenue-per-client.service';

@Module({
  imports:[DatabaseModule],
  controllers: [RevenuePerClientController],
  providers: [
    CreateRevenuePerClientService, 
    PatchRevenuePerClientService,
    RemoveRevenuePerClientService,
    FindAllRevenuePerClientService
  ]
})
export class RevenuePerClientModule {}
