import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { ClientsCompanyController } from './clients_company.controller';
import FindAllClientCompanyService from './services/find-all-client-company.service';
import FindOneByClientCompanyService from './services/find-one-by-client-company.service';
import DeleteCompanyService from './services/delete-company.service';
import CreateCompanyService from './services/create-company.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientsCompanyController],
  providers: [
    FindAllClientCompanyService,
    FindOneByClientCompanyService,
    DeleteCompanyService,
    CreateCompanyService
  ]
})
export class ClientsCompanyModule { }
