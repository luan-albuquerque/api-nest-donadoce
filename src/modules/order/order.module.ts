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
    PatchDisabledOrderService,
    FindManyOrderInProcess,
    CreateOrderCoffeService,
  ]
})
export class OrderModule {}
