import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByAdminOrderDTO } from '../dto/list-by-admin-order.dto';
import { OrderItem } from '../entities/order-item.entity';


@Injectable()
export class FindOrderItemInHomologateService {

  constructor(
    private readonly orderRepository: OrderRepository
  ) { }

  async execute(fk_order: string) {

    try {
      const data = await this.orderRepository.findById(fk_order);
      const pedidosEmHomol: OrderItem[] = [];
      var statusAlReadyExistHom = false;
      data.orderItem.map((item) => {
        if (item.homologate == "EM_HOMOLOGACAO") {
          pedidosEmHomol.push(item);
          statusAlReadyExistHom = true;
        }
      });


      return {
        statusAlReadyExistHom,
        message: statusAlReadyExistHom == false ? "Não existem itens em homologação" : "Existe items de pedido que estavam fora do cardapio em homologação.",
        pedidosEmHomol
        
      }


    } catch (error) {

      throw new InternalServerErrorException("Erro: " + error)
    }


  }
}