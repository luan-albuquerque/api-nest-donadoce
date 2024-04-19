import { Module } from '@nestjs/common';
import { OrderItemController } from './order-item.controller';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { AddItemInOrderProgrammedService } from './services/add-item-in-order-programmed.service';
import { PatchItemInOrderProgrammedService } from './services/patch-item-in-order-programmed.service';
import { RemoveItemInOrderProgrammedService } from './services/remove-item-in-order-programmed.service';

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [OrderItemController],
  providers: [
    AddItemInOrderProgrammedService,
    PatchItemInOrderProgrammedService,
    RemoveItemInOrderProgrammedService,
  ]
})
export class OrderItemModule {}
