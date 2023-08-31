import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { CreateOrderService } from './services/create-order.service';
import { FindManyOrderByClientService } from './services/find-many-order-by-client.service';
import { FindManyOrderService } from './services/find-many-order.service';
import { PatchOrderService } from './services/patch-order.service';
import { PatchStatusOrderItemService } from './services/patch-status-order-item.service';
import { PatchTrayOrderService } from './services/patch-tray-order.service';

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [OrderController],
  providers: [
    CreateOrderService,
    FindManyOrderByClientService,
    FindManyOrderService,
    PatchOrderService,
    PatchStatusOrderItemService,
    PatchTrayOrderService
  ]
})
export class OrderModule {}
