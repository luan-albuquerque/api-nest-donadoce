import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ClientsRepository } from 'src/modules/clients/repository/contract/ClientsRepository';
import { OrderRepository } from 'src/modules/order/repository/contract/OrderRepository';


@Injectable()
export class PatchStatusOrderByClientService {

  constructor(
    private readonly orderRepository: OrderRepository,
  
    private readonly clientsRepository: ClientsRepository,

  ) { }

  async execute(id: string, fk_order_status: string, comment: string) {

    try {

      const order = await this.orderRepository.findById(id);
      const client = await this.clientsRepository.findById(order.fk_user);

      if (!client) {
        throw new UnauthorizedException("Usuario que realizou o pedido não pertencem a cadeia de usuarios cliente")
      }

      if (order.fk_orderstatus == "1c69c120002-575f34-1c69-be56-0242ac1201c69") {
        throw new UnauthorizedException("Pedido ja foi entregue")
      }


      if (order.fk_orderstatus != "22afa4e4-4e7f-14ee-be56-0222afa2d22afb092") {
        throw new UnauthorizedException("Pedido não está com o status 'Revisão Client'")
      }

      if (fk_order_status == "016b9c84-4e7f-81ee-be56-0242ac1200022fe2af" || fk_order_status == "fer762d-erjr345d4s5f-dfkj3kd-39dsu49dshn3") {
        throw new UnauthorizedException("O status so pode ser 'Revisão Client' ou 'Finalizado'");
      }
    
      await this.orderRepository.patchStatusByClient(id, fk_order_status, comment);

    } catch (error) {

      throw new InternalServerErrorException("Erro no servidor")

    }


  }

}