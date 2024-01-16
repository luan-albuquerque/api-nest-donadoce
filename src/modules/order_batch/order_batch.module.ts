import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { FindManyOrderBatchService } from './services/find-many-order-batch.service';
import { CreateOrderBatchService } from './services/create-order-batch.service';
import { OrderBatchController } from './order_batch.controller';
import { AddPaymentVoucherInOrderBatchService } from './services/add-payment-voucher-in-order-batch.service';
import { DeleteOrderBatchService } from './services/delete-orderbatch.service';
import { UpdateInvoiceInOrderBatch } from './services/update-invoice-in-order-batch.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderBatchController],
  providers: [CreateOrderBatchService, FindManyOrderBatchService, AddPaymentVoucherInOrderBatchService, DeleteOrderBatchService, UpdateInvoiceInOrderBatch
  ],
})
export class OrderBatchModule {}
