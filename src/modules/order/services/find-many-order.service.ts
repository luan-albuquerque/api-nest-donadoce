import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByAdminOrderDTO } from '../dto/list-by-admin-order.dto';
import * as dayjs from "dayjs";


@Injectable()
export class FindManyOrderService {

  constructor(
    private readonly orderRepository: OrderRepository
  ) { }

  async execute({ data = undefined,desc_user  = undefined, numberOrder = undefined, skip, take, order_status = undefined, orderType  = undefined, fk_client = undefined, fk_company = undefined }: ListByAdminOrderDTO) {
     
     try {
     const dataInitial = dayjs(dayjs(data).format("YYYY-MM-DDT00:00:00Z")).utc(true).toDate();
     const dataFinal = dayjs(dayjs(data).format("YYYY-MM-DDT00:00:00Z")).add(1, 'day').utc(true).toDate()
     
     

      return await this.orderRepository.findMany({ desc_user, numberOrder, skip, take, order_status, orderType, fk_client, fk_company }, dataInitial,dataFinal)
      
     } catch (error) {

        throw new InternalServerErrorException("Erro: " + error)
     }
    

  }
}