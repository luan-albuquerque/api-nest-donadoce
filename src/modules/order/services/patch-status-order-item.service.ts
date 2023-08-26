import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByAdminOrderDTO } from '../dto/list-by-admin-order.dto';
import { PatchStatusOrderItemDto } from '../dto/patch-status-order-item.';


@Injectable()
export class PatchStatusOrderItemService {

  constructor(
    private readonly orderRepository: OrderRepository
  ) { }

  async execute(id: string, data: PatchStatusOrderItemDto) {

    try {

      const order = await this.orderRepository.findById(id)
      if (!order) {
        throw new NotFoundException("Pedido não encontrado")
      }


      await this.orderRepository.patchStatusOrderItem(id, data);

    } catch (error) {
      throw new InternalServerErrorException(error)
    }


  }
}