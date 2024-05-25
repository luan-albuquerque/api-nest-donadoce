import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByClientOrderDTO } from '../dto/list-by-client-order.dto';
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';


@Injectable()
export class FindManyTrayAndBoxesService {

  constructor(
    private readonly orderRepository: OrderRepository,

  ) { }

  async execute(take: number, skip: number, fk_orderstatus: string = undefined) {
    
    
     return await this.orderRepository.findManyTrayAndBoxes(take, skip, fk_orderstatus)

  }
}