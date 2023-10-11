import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { PatchStatusOrderItemDto } from '../dto/patch-status-order-item.';
import { GenerateLogs } from 'src/shared/exception/GenerateLogs.exception';
import { OrderItemRepository } from 'src/modules/order_item/repository/contract/OrderItemRepository';


@Injectable()
export class PatchTrayOrderService {

    constructor(
        private readonly orderItemRepository: OrderItemRepository,
        private readonly orderRepository: OrderRepository
    ) { }

    async execute(id: string, amount_of_tray: number) {
        try {

            const order = await this.orderRepository.findById(id)
            if (!order) {
                throw new NotFoundException("Pedido não encontrado")
            }

            await this.orderItemRepository.patchTrayOrder(id, amount_of_tray);

        } catch (error) {
            await GenerateLogs.generate(error)
            throw new InternalServerErrorException(error)
        }


    }
}