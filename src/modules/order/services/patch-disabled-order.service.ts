import { Injectable, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { PatchStatusOrderItemDto } from '../dto/patch-status-order-item.';
import { GenerateLogs } from 'src/shared/exception/GenerateLogs.exception';


@Injectable()
export class PatchDisabledOrderService {

    constructor(
        private readonly orderRepository: OrderRepository
    ) { }

    async execute(id: string) {
        try {

            const order = await this.orderRepository.findById(id)
            if (!order) {
                throw new NotFoundException("Pedido não encontrado")
            }
              // Se pedido não possuir status Solicitado, Agendado ou Pré-Produção ele não pode ser cancelado
            if (!(
                order.fk_orderstatus == "022ac120002-1c69-11ee-be56-0242ac120002" 
                || order.fk_orderstatus == "11ee6828-1c69-11ee-be56-c691200020241" 
                || order.fk_orderstatus == "314e2828-1c69-11ee-be56-c691200020241"
                )) {
                throw new UnauthorizedException("Pedido não pode ser mais cancelado")
              }

            await this.orderRepository.patchStatus(id, "55b4c3a6-4e7f-31ee-be56-0242ac12000224fe4");


        } catch (error) {
            await GenerateLogs.generate(error)
            throw new InternalServerErrorException(error)
        }


    }
}