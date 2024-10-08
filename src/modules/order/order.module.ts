import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { FindManyOrderByClientService } from './services/find-many-order-by-client.service';
import { FindManyOrderService } from './services/find-many-order.service';
import { PatchOrderStatusService } from './services/patch-order-status.service';
import { PatchStatusOrderItemService } from './services/patch-status-order-item.service';
import { PatchTrayOrderService } from './services/patch-tray-order.service';
import { PatchDisabledOrderService } from './services/patch-disabled-order.service';
import { FindManyOrderInProcess } from './services/find-many-order-in-process.service';
import { CreateOrderProgrammedService } from './services/create-order-programmed.service';
import { CreateOrderCoffeService } from './services/create-order-coffe.service';
import { PatchAddCautionOrderService } from './services/patch-add-caution-order.service';
import { FindOrderItemInHomologateService } from './services/find-order-item-in-homologate.service';
import { PatchAddInvoiceOrderService } from './services/patch-add-invoice-order.service';
import { PatchAddPaymentVoucherOrderService } from './services/patch-add-payment-voucher-order.service';
import { FindManyOrderRoutesService } from './services/find-many-order-routes.service';
import { FindManyOrderAllFiltersService } from './services/find-many-order-all-filters.service';
import { FindManyOrderToBatchService } from './services/find-many-order-to-batch.service';
import { FindExportListFaturamento } from './services/find-exportorders.service';
import { FindManyTrayAndBoxesService } from './services/find-many-tray-and-boxes.service';
import { FindExportListFaturamentoCsv } from './services/find-exportorders-csv.service';

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [OrderController],
  providers: [
    CreateOrderProgrammedService,
    FindManyOrderByClientService,
    FindManyOrderService,
    PatchOrderStatusService,
    PatchStatusOrderItemService,
    PatchTrayOrderService,
    FindExportListFaturamento,
    PatchDisabledOrderService,
    FindManyOrderInProcess,
    CreateOrderCoffeService,
    PatchAddCautionOrderService,
    FindOrderItemInHomologateService,
    PatchAddInvoiceOrderService,
    PatchAddPaymentVoucherOrderService,
    FindManyOrderRoutesService,
    FindManyOrderAllFiltersService,
    FindManyOrderToBatchService,
    FindManyTrayAndBoxesService,
    FindExportListFaturamentoCsv
  ]
})
export class OrderModule {}
