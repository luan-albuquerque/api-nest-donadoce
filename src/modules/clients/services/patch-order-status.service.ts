import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ClientsRepository } from 'src/modules/clients/repository/contract/ClientsRepository';
import { OrderRepository } from 'src/modules/order/repository/contract/OrderRepository';


@Injectable()
export class PatchStatusOrderByClientService {

  constructor(
    private readonly orderRepository: OrderRepository,
  
    private readonly clientsRepository: ClientsRepository,

  ) { }

  async execute(id: string, fk_user: string, fk_order_status: string, comment?: string) {

    

      const order = await this.orderRepository.findById(id);
      const client = await this.clientsRepository.findById(order.fk_user);

      if (!client) {
        throw new UnauthorizedException("Usuario que realizou o pedido não pertencem a cadeia de usuarios cliente")
      }

      if(order.fk_user != fk_user){
        throw new BadRequestException("Pedido pertencem a outro cliente")
      }
       //Cancelado
      if(fk_order_status == "55b4c3a6-4e7f-31ee-be56-0242ac12000224fe4"){
             if(     
              //Pré-Produção || Agendado || Solicitado
              order.fk_orderstatus != "314e2828-1c69-11ee-be56-c691200020241" && 
              order.fk_orderstatus != "11ee6828-1c69-11ee-be56-c691200020241" &&
              order.fk_orderstatus != "022ac120002-1c69-11ee-be56-0242ac120002" ){
                throw new BadRequestException("Pedido não pode ser mais cancelado devido o status não está mais disponivel para cancelamento")
             }

       await this.orderRepository.patchStatusByClient(id, "55b4c3a6-4e7f-31ee-be56-0242ac12000224fe4", undefined);

       return;

      }

      if (order.fk_orderstatus == "1c69c120002-575f34-1c69-be56-0242ac1201c69") {
        throw new UnauthorizedException("Pedido ja foi entregue")
      }


      if (order.fk_orderstatus != "22afa4e4-4e7f-14ee-be56-0222afa2d22afb092") {
        throw new UnauthorizedException("Pedido não está com o status 'Revisão Client'")
      }

      if (fk_order_status != "016b9c84-4e7f-81ee-be56-0242ac1200022fe2af" ) {
        throw new UnauthorizedException("O status so pode ser 'Revisão Admin'");
      }
    
      await this.orderRepository.patchStatusByClient(id, fk_order_status, comment);

    

  }

}