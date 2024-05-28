import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByAdminOrderDTO } from '../dto/list-by-admin-order.dto';
import * as dayjs from "dayjs";
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';


@Injectable()
export class FindManyOrderToBatchService {

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository
  ) { }

  async execute({ desc_user = undefined, numberOrder = undefined, skip, take, order_status = undefined, orderType = undefined, fk_client = undefined }: ListByAdminOrderDTO, fk_company: string) {
    
     try {

      if(numberOrder != undefined){
        const order = await this.orderRepository.findOne(Number(numberOrder))
  
          if (!order) {
            throw new NotFoundException("Numero de pedido não encontrado")
          }
        }
  
        const user = await this.userRepository.findById(fk_client)
  
        if (!user && user.is_client == false) {
          throw new NotFoundException("Cliente não encontrado")
        }
        var where: any = {
          AND: {
          fk_orderstatus: order_status,
          fk_user: fk_client,
          fk_company: fk_company,
          user: {
            Clients: {
              corporate_name: {
                contains: desc_user,
                mode: 'insensitive',
              }
            }
          },
  
          order_type: orderType,
          numberOrder: numberOrder != undefined ? Number(numberOrder) : numberOrder,
          orderBatchItem: null,
          }
        }
        
 
       
    
      const data = await this.orderRepository.findManyAllToBatch({ desc_user, numberOrder, skip, take, order_status, orderType, fk_client }, where)

      return {
        count: data.length,
        data,
      }
      
     } catch (error) {

        throw new InternalServerErrorException("Erro: " + error)
     }
    

  }
}