import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByAdminOrderDTO } from '../dto/list-by-admin-order.dto';


@Injectable()
export class FindManyOrderService {

  constructor(
    private readonly orderRepository: OrderRepository
  ) { }

  async execute({ desc_user, numberOrder, skip, take }: ListByAdminOrderDTO) {
     
     try {
      return await this.orderRepository.findMany({ desc_user, numberOrder, skip, take })
      
     } catch (error) {
        throw new InternalServerErrorException("Erro no servidor")
     }
    

  }
}