import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { CreateCompanyService } from './services/create-company.service';
import { FindAllCompanyService } from './services/find-all-company.service';
import { FindOneCompanyService } from './services/find-one-company.service';
import { RemoveCompanyService } from './services/remove-company.service';
import { UpdateCompanyService } from './services/update-company.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CompanyController],
  providers: [
    CreateCompanyService,
    FindAllCompanyService, 
    FindOneCompanyService, 
    UpdateCompanyService, 
    RemoveCompanyService
  ]
})
export class CompanyModule { }
