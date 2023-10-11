import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByAdminOrderDTO } from '../dto/list-by-admin-order.dto';
import * as dayjs from 'dayjs';
import { CategoryOrderItem } from 'src/modules/category_order_items/entities/category_menu_item.entity';
import { CategoryOrderItemRepository } from 'src/modules/category_order_items/repository/contract/CategoryOrderItemRepository';
import { OrderItemRepository } from 'src/modules/order_item/repository/contract/OrderItemRepository';


@Injectable()
export class FindManyOrderInProcess {

  constructor(
    private readonly orderItemRepository: OrderItemRepository,
    private readonly c: CategoryOrderItemRepository
  ) { }

  async execute() {

    try {

      return await this.orderItemRepository.findAllOrdersInProcess()

    } catch (error) {
      throw new InternalServerErrorException("Erro: " + error)
    }


  }
}