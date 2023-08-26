import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { OrderBatchItemController } from './order_batch_item.controller';
import { RemoveOrderBatchItemService } from './services/remove-order-batch-item.service';
import { CreateOrderBatchItemService } from './services/create-order-batch-item.service';
;

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [OrderBatchItemController],
  providers: [
    CreateOrderBatchItemService,
    RemoveOrderBatchItemService
  ]
})
export class OrderBatchItemModule {}
