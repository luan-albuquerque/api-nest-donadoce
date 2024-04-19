import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByAdminOrderDTO } from '../dto/list-by-admin-order.dto';
import * as dayjs from "dayjs";
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';


@Injectable()
export class FindManyOrderAllFiltersService {

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository
  ) { }

  async execute({ desc_user = undefined, numberOrder = undefined, skip, take, order_status = undefined, orderType = undefined, fk_client = undefined }: ListByAdminOrderDTO, listWithOrderBatchNull = false) {

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
        fk_orderstatus: order_status,
        fk_user: fk_client,
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
      }
      console.log({listWithOrderBatchNull});
      
      if (listWithOrderBatchNull) {
        where = {
          fk_orderstatus: order_status,
          fk_user: fk_client,
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

      return await this.orderRepository.findManyAllFilter({ desc_user, numberOrder, skip, take, order_status, orderType, fk_client }, where)

    } catch (error) {

      throw new InternalServerErrorException("Erro: " + error)
    }


  }
}