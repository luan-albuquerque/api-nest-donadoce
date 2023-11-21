import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { OrderBatchRepository } from '../repository/contract/OrderBatchRepository';
import { FilterOrderBatch } from '../dto/filter_order_batch.dto';
import { OrderBatchItemRepository } from 'src/modules/order_batch_item/repository/contract/OrderBatchItemRepository';


@Injectable()
export class DeleteOrderBatchService {

  constructor(
    private readonly orderBatchRepository: OrderBatchRepository,
    private readonly orderBatchItemRepository: OrderBatchItemRepository
  ) { }

  async execute(id: string) {
     
    var orderBatchAllReadyExist = await this.orderBatchRepository.findOneOrderBatch(id);

    if (!orderBatchAllReadyExist) {
      throw new NotFoundException('Lote não encontrado.')
    }

    await this.orderBatchItemRepository.delete(id).finally(async ()=>{
        await this.orderBatchRepository.delete(id);
    })

  }
}