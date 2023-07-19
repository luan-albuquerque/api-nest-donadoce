import { Module } from '@nestjs/common';
import { RevenuePerCompanyService } from './revenue-per-company.service';
import { RevenuePerCompanyController } from './revenue-per-company.controller';

@Module({
  controllers: [RevenuePerCompanyController],
  providers: [RevenuePerCompanyService]
})
export class RevenuePerCompanyModule {}
