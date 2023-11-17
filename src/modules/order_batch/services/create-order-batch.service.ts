import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

          throw new NotFoundException('Pedido ' + item.fk_order + ' não encontrado.')
        }

        var orderSem = orderSemOrderBatch.find((t) => t.id === item.fk_order)

      //   if (  orderSem.fk_orderstatus != "1c69c120002-575f34-1c69-be56-0242ac1201c69" &&
      //   orderSem.fk_orderstatus != "016b9c84-4e7f-81ee-be56-0242ac1200022fe2af" &&
      //   orderSem.fk_orderstatus != "789850813-1c69-11ee-be56-c691200020241") {
      //     this.deleteFile(createOrderBatch.file_invoice_absolute);

      //     throw new BadRequestException("Para adicionar nota fiscal o pedido deve está com staus 'Revisão Admin' ou 'Entregue' Erro: " + orderSem.numberOrder)
      // }

        if (!orderSem && orderSem.file_invoice != null && orderSem.fk_orderstatus != "016b9c84-4e7f-81ee-be56-0242ac1200022fe2af") {

          // this.deleteFile(createOrderBatch.file_invoice_absolute);

          throw new BadRequestException('Pedido possivelmente está vinculado a um lote - fk_order: ' + item.fk_order);

        }
      })
    )

    await this.orderBatchRepository.create(createOrderBatch).then(async () => {
      createOrderBatch.createOrderBatchItem.map(async (item) => {
        await this.orderRepository.addInvoiceInOrder(item.fk_order, createOrderBatch.file_invoice, createOrderBatch.invoice_number);
      })
    });

  }


  async deleteFile(path_absolute: string) {
    fs.access(path_absolute).then(() => {
      fs.unlink(path_absolute)

    })
  }


}

