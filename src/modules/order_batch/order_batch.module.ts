import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { FindManyOrderBatchService } from './services/find-many-order-batch.service';
import { CreateOrderBatchService } from './services/create-order-batch.service';
import { OrderBatchController } from './order_batch.controller';
import { AddPaymentVoucherInOrderBatchService } from './services/add-payment-voucher-in-order-batch.service';
import { DeleteOrderBatchService } from './services/delete-orderbatch.service';
import { UpdateInvoiceInOrderBatch } from './services/update-invoice-in-order-batch.service';
import { ListUsersForOrderBatchService } from './services/list-users-for-order-batch.service';
import { FindOneOrderBatchForCsvService } from './services/find-one-order-batch-for-csv.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderBatchController],
  providers: [CreateOrderBatchService, FindManyOrderBatchService, FindOneOrderBatchForCsvService, AddPaymentVoucherInOrderBatchService, DeleteOrderBatchService, UpdateInvoiceInOrderBatch, ListUsersForOrderBatchService
  ],
})
export class OrderBatchModule {}
