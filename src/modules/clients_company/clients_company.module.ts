import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { ClientsCompanyController } from './clients_company.controller';
import FindAllClientCompanyService from './services/find-all-client-company.service';
import FindOneByClientCompanyService from './services/find-one-by-client-company.service';
import CreateClientCompanyService from './services/create-client-company.service';
import { DeleteClientCompanyService } from './services/delete-client-company.service';
import BCryptHash from '../users/providers/implementations/BCryptHash';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientsCompanyController],
  providers: [
    FindAllClientCompanyService,
    FindOneByClientCompanyService,
    CreateClientCompanyService,
    DeleteClientCompanyService,
    BCryptHash
  ]
})
export class ClientsCompanyModule { }
