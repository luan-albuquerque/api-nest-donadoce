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
import { UpdateInvoiceOrderBatch } from '../dto/update_invoice_order_batch.dto';

@Injectable()
export class UpdateInvoiceInOrderBatch {

  constructor(
    private readonly orderBatchRepository: OrderBatchRepository,
    private readonly orderRepository: OrderRepository
  ) { }


  async execute(id: string, updateInvoiceOrderBatch: UpdateInvoiceOrderBatch) {




    var orderBatchAllReadyExist = await this.orderBatchRepository.findOneOrderBatch(id);

    if (!orderBatchAllReadyExist) {

      throw new NotFoundException('Lote não encontrado.')
    }

    if (updateInvoiceOrderBatch.file_invoice) { orderBatchAllReadyExist.file_invoice = updateInvoiceOrderBatch.file_invoice }
    if (updateInvoiceOrderBatch.invoice_number) { orderBatchAllReadyExist.invoice_number = updateInvoiceOrderBatch.invoice_number }


    await this.orderBatchRepository.addPaymentVoucher(id, orderBatchAllReadyExist.file_invoice).finally(async () => {
      orderBatchAllReadyExist.OrderBatchItem.map(async (item) => {
        await this.orderRepository.addInvoiceInOrder(item.fk_order, orderBatchAllReadyExist.file_invoice, orderBatchAllReadyExist.invoice_number);
      })
    })



  }


}