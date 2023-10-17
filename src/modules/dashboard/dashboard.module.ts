import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/config/database/database.module';


@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [],
  providers: [

  ]
})
export class DashboardModule {}
