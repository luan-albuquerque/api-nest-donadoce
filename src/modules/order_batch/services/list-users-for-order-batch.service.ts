import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderBatchRepository } from '../repository/contract/OrderBatchRepository';
import { FilterOrderBatch } from '../dto/filter_order_batch.dto';
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';


@Injectable()
export class ListUsersForOrderBatchService {

  constructor(
    private readonly orderBatchRpeository: OrderBatchRepository,
    private readonly userRepository: UserRepository
  ) { }

  async execute() {
     
    const listUser = await this.userRepository.listUserToOrderBatch();

    return listUser;
    

  }
}