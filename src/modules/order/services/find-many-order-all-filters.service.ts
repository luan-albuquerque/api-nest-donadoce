import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByAdminOrderDTO } from '../dto/list-by-admin-order.dto';
import * as dayjs from "dayjs";


@Injectable()
export class FindManyOrderAllFiltersService {

  constructor(
    private readonly orderRepository: OrderRepository
  ) { }

  async execute({desc_user = undefined, numberOrder = undefined, skip, take, order_status = undefined, orderType  = undefined, fk_client = undefined }: ListByAdminOrderDTO) {
     
     try {

       
    
      return await this.orderRepository.findManyAllFilter({ desc_user, numberOrder, skip, take, order_status, orderType, fk_client })
      
     } catch (error) {

        throw new InternalServerErrorException("Erro: " + error)
     }
    

  }
}