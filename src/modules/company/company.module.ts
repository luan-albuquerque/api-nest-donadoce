import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './services/company.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
