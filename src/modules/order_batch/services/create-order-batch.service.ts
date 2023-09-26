import { Injectable, NotFoundException } from '@nestjs/common';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { CategoryOrderItemRepository } from 'src/modules/category_order_items/repository/contract/CategoryOrderItemRepository';
import { RevenuePerClientRepository } from 'src/modules/revenue-per-client/repository/contract/RevenuePerClientRepository';
import { OrderBatchRepository } from '../repository/contract/OrderBatchRepository';
import { OrderRepository } from 'src/modules/order/repository/contract/OrderRepository';
import { CreateOrderBatch } from '../dto/create_order_batch.dto';
import { Order } from 'src/modules/order/entities/order.entity';
import * as fs from 'fs/promises';

@Injectable()
export class CreateOrderBatchService {

  constructor(
    private readonly orderBatchRepository: OrderBatchRepository,
    private readonly orderRepository: OrderRepository
  ) { }


  async execute(createOrderBatch: CreateOrderBatch) {

    const orderAll: Order[] = await this.orderRepository.findManyNotFilter();
    const orderSemOrderBatch = await this.orderRepository.findManyOrderByClientNotOrderBatch(createOrderBatch.fk_client)

    await Promise.all(
      createOrderBatch.createOrderBatchItem.map(async (item) => {
        var orderAlReadyExist = orderAll.find((order) => order.id === item.fk_order);

        if (!orderAlReadyExist) {
          this.deleteFile(createOrderBatch.file_invoice_absolute);
          this.deleteFile(createOrderBatch.file_payment_voucher_absolute);
          this.deleteFile(createOrderBatch.file_caution_absolute);

          throw new NotFoundException('Pedido ' + item.fk_order + ' não encontrado.')
        }

        var orderSem = orderSemOrderBatch.find((t) => t.id === item.fk_order)

        if (!orderSem) {

          this.deleteFile(createOrderBatch.file_invoice_absolute);
          this.deleteFile(createOrderBatch.file_payment_voucher_absolute);
          this.deleteFile(createOrderBatch.file_caution_absolute);

          throw new NotFoundException('Pedido possivelmente está vinculado a um lote - fk_order: ' + item.fk_order);

        }
      })
    )

    await this.orderBatchRepository.create(createOrderBatch);

  }


  async deleteFile(path_absolute: string) {
    fs.access(path_absolute).then(() => {
      fs.unlink(path_absolute)

    })
  }


}

