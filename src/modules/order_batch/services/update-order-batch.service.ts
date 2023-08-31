import { Injectable, NotFoundException } from '@nestjs/common';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { CategoryOrderItemRepository } from 'src/modules/category_order_items/repository/contract/CategoryOrderItemRepository';
import { RevenuePerClientRepository } from 'src/modules/revenue-per-client/repository/contract/RevenuePerClientRepository';
import { OrderBatchRepository } from '../repository/contract/OrderBatchRepository';
import { OrderRepository } from 'src/modules/order/repository/contract/OrderRepository';
import { CreateOrderBatch } from '../dto/create_order_batch.dto';
import { Order } from 'src/modules/order/entities/order.entity';
import * as fs from 'fs/promises';
import { UpdateOrderBatch } from '../dto/update_order_batch.dto';

@Injectable()
export class UpdateOrderBatchService {

  constructor(
    private readonly orderBatchRepository: OrderBatchRepository,
    private readonly orderRepository: OrderRepository
  ) { }


  async execute(id: string, updateOrderBatch: UpdateOrderBatch) {




    var orderBatchAllReadyExist = await this.orderBatchRepository.findOneOrderBatch(id);

    if (!orderBatchAllReadyExist) {
      fs.access(updateOrderBatch.file_absolute).then(() => {
        fs.unlink(updateOrderBatch.file_absolute)
      })
      throw new NotFoundException('Lote não encontrado.')
    }

    orderBatchAllReadyExist.fk_client = !updateOrderBatch.fk_client ? orderBatchAllReadyExist.invoice_file : updateOrderBatch.fk_client
    orderBatchAllReadyExist.invoice_number = !updateOrderBatch.invoice_number ? orderBatchAllReadyExist.invoice_file : updateOrderBatch.invoice_number
    orderBatchAllReadyExist.invoice_file = !updateOrderBatch.invoice_file ? orderBatchAllReadyExist.invoice_file : updateOrderBatch.invoice_file
   
    

  }

}