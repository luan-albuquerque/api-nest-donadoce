import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { CreatePersonService } from './services/create-person.service';
import { FindAllPersonService } from './services/find-all-person.service';
import { UpdatePersonService } from './services/update-person.service';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import BCryptHash from './providers/implementations/BCryptHash';

@Module({
  imports:[DatabaseModule],
  controllers: [PersonController],
  providers: [
    CreatePersonService,
    FindAllPersonService,
    UpdatePersonService,
    BCryptHash,
  ]
})
export class PersonModule {}
