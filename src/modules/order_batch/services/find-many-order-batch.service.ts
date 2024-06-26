import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderBatchRepository } from '../repository/contract/OrderBatchRepository';
import { FilterOrderBatch } from '../dto/filter_order_batch.dto';
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';


@Injectable()
export class FindManyOrderBatchService {

  constructor(
    private readonly orderBatchRpeository: OrderBatchRepository,
    private readonly userRepository: UserRepository,
  ) { }

  async execute(filterOrderBatch: FilterOrderBatch) {

    if (filterOrderBatch.fk_client) {
      const user = await this.userRepository.finInforUser(filterOrderBatch.fk_client);

      if (user?.is_company) {
        filterOrderBatch.fk_client = user?.Client_Company.clients.id;
        filterOrderBatch.fk_company = user.id;
        
      } 
      

    }
    return await this.orderBatchRpeository.findAllOrderBatch(filterOrderBatch);


  }
}