import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByAdminOrderDTO } from '../dto/list-by-admin-order.dto';


@Injectable()
export class FindManyOrderInProcess {

  constructor(
    private readonly orderRepository: OrderRepository
  ) { }

  async execute() {
     
     try {
      return await this.orderRepository.findAllOrdersInProcess()
      
     } catch (error) {
        throw new InternalServerErrorException("Erro no servidor")
     }
    

  }
}