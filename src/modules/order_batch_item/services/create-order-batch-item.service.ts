import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderBatchItemRepository } from '../repository/contract/OrderBatchItemRepository';
import { CreateOrderBatchItemManual } from '../dto/create_order_batch_item_manual.dto';


@Injectable()
export class CreateOrderBatchItemService {

  constructor(
    private readonly orderBatchItemRepository: OrderBatchItemRepository,
  ) { }


  async execute(data: CreateOrderBatchItemManual[]) {

    const OrderBatchItem = await this.orderBatchItemRepository.findAll();


    await Promise.all(
      data.map((item) => {
        var OrderBatchItemFind = OrderBatchItem.find((o) => o.fk_order === item.fk_order && o.fk_orderBatch === item.fk_orderBatch)
        if (OrderBatchItemFind) {
          throw new NotFoundException('Pedido ' + OrderBatchItemFind.order.numberOrder + ' já esta vinculado na nota:' + OrderBatchItemFind.orderBatch.invoice_number)
        }
      })
    )


    await this.orderBatchItemRepository.addItem(data);



  }
}