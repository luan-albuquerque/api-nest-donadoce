import { Module } from '@nestjs/common';
import { RevenuePerCompanyController } from './revenue-per-company.controller';
import { CreateRevenuePerCompanyService } from './services/create-revenue-per-company.service';
import { PatchRevenuePerCompanyService } from './services/patch-revenue-per-company.service';
import { RemoveRevenuePerCompanyService } from './services/remove-revenue-per-company.service';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { FindAllRevenuePerCompanyService } from './services/find-all-revenue-per-company.service';

@Module({
  imports:[DatabaseModule],
  controllers: [RevenuePerCompanyController],
  providers: [
    CreateRevenuePerCompanyService, 
    PatchRevenuePerCompanyService,
    RemoveRevenuePerCompanyService,
    FindAllRevenuePerCompanyService
  ]
})
export class RevenuePerCompanyModule {}
