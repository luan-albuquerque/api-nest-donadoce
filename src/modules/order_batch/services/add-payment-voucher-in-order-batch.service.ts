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
export class AddPaymentVoucherInOrderBatchService {

  constructor(
    private readonly orderBatchRepository: OrderBatchRepository,
    private readonly orderRepository: OrderRepository
  ) { }


  async execute(id: string, file_payment_voucher: string, file_path: string) {




    var orderBatchAllReadyExist = await this.orderBatchRepository.findOneOrderBatch(id);

    if (!orderBatchAllReadyExist) {
      this.deleteFile(file_path);
      throw new NotFoundException('Lote não encontrado.')
    }


    await this.orderBatchRepository.addPaymentVoucher(id, file_payment_voucher).finally(async () => {
      orderBatchAllReadyExist.OrderBatchItem.map(async (item) => {
        await this.orderRepository.addPaymentVoucherInOrder(item.fk_order, file_payment_voucher);
      })
    })



  }

  async deleteFile(path_absolute: string) {
    fs.access(path_absolute).then(() => {
      fs.unlink(path_absolute)
    })
  }

}