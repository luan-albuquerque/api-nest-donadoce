import { Module } from '@nestjs/common';
import { RevenueController } from './revenue.controller';
import { RevenueService } from './services/revenue.service';

@Module({
  controllers: [RevenueController],
  providers: [RevenueService]
})
export class RevenueModule {}
