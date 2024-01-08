import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByClientOrderDTO } from '../dto/list-by-client-order.dto';


@Injectable()
export class FindManyOrderByClientService {

  constructor(
    private readonly orderRepository: OrderRepository
  ) { }

  async execute({ fk_user, numberOrder, skip, take, order_status, fk_company }: ListByClientOrderDTO) {


      return await this.orderRepository.findManyByClient({ fk_user, numberOrder, skip, take, order_status, fk_company })




  }
}