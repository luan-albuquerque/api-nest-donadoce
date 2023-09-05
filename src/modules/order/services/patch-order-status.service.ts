import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByAdminOrderDTO } from '../dto/list-by-admin-order.dto';


@Injectable()
export class PatchOrderStatusService {

  constructor(
    private readonly orderRepository: OrderRepository
  ) { }

  async execute(id: string, fk_order_status: string) {

    try {

      const order = await this.orderRepository.findById(id)
      if (order.fk_orderstatus == "1c69c120002-575f34-1c69-be56-0242ac1201c69") {
        throw new UnauthorizedException("Pedido ja foi entregue")
      }

      if (fk_order_status == "022ac120002-1c69-11ee-be56-0242ac120002") {
        throw new UnauthorizedException("Pedido não pode possui o status inicial")
      }

      await this.orderRepository.patchStatus(id, fk_order_status);

    } catch (error) {
      throw new InternalServerErrorException("Erro no servidor")
    }


  }
}