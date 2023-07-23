import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import { CreateOrderService } from './services/create-order.service';
import { FindManyOrderByClientService } from './services/find-many-order-by-client.service';

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [OrderController],
  providers: [
    CreateOrderService,
    FindManyOrderByClientService
  ]
})
export class OrderModule {}
