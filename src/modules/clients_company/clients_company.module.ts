import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { ClientsCompanyController } from './clients_company.controller';
import FindAllClientCompanyService from './services/find-all-client-company.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientsCompanyController],
  providers: [
    FindAllClientCompanyService

  ]
})
export class ClientsCompanyModule { }
