import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { OrderBatchItemController } from './order_batch_item.controller';
;

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [OrderBatchItemController],
  providers: [
  ]
})
export class OrderBatchItemModule {}
