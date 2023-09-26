import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { FindManyOrderBatchService } from './services/find-many-order-batch.service';
import { CreateOrderBatchService } from './services/create-order-batch.service';
import { OrderBatchController } from './order_batch.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderBatchController],
  providers: [CreateOrderBatchService, FindManyOrderBatchService],
})
export class OrderBatchModule {}
