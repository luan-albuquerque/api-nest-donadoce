import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderBatchRepository } from '../repository/contract/OrderBatchRepository';
import { FilterOrderBatch } from '../dto/filter_order_batch.dto';


@Injectable()
export class FindManyOrderBatchService {

  constructor(
    private readonly orderBatchRpeository: OrderBatchRepository
  ) { }

  async execute(filterOrderBatch: FilterOrderBatch) {
     
    return await this.orderBatchRpeository.findOrderBatch(filterOrderBatch);
    

  }
}