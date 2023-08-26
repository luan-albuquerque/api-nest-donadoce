import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderBatchItemRepository } from '../repository/contract/OrderBatchItemRepository';
import { CreateOrderBatchItemManual } from '../dto/create_order_batch_item_manual.dto';


@Injectable()
export class RemoveOrderBatchItemService {

  constructor(
    private readonly orderBatchItemRepository: OrderBatchItemRepository,
  ) { }


  async execute({ fk_order, fk_orderBatch }: CreateOrderBatchItemManual) {


    const findOrderBatch = await this.orderBatchItemRepository.findBy(fk_order, fk_orderBatch);
    if (!findOrderBatch) {

      throw new NotFoundException("OrderBatch não encontrado");

    }

    await this.orderBatchItemRepository.removeItem({ fk_order, fk_orderBatch });


  }
}