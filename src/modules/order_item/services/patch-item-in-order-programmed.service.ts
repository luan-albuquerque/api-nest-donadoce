import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { OrderItemRepository } from "../repository/contract/OrderItemRepository";
import { OrderRepository } from "src/modules/order/repository/contract/OrderRepository";
import { RemoveItemInOrderDTO } from "../dto/remove-item-in-order-programmed.dto";
import { PatchItemInOrderDTO } from "../dto/patch-item-in-order-programmed.dto";

@Injectable()
export class PatchItemInOrderProgrammedService {

    constructor(
        private readonly orderItemRepository: OrderItemRepository,
        private readonly orderRepository: OrderRepository
    ) { }

    async execute({ amountItem, fk_categoryOrderItem, fk_order, fk_revenue }: PatchItemInOrderDTO) {

        const orderItem = this.orderItemRepository.findOneOrderItem(fk_categoryOrderItem, fk_order, fk_revenue);

        if (!orderItem) {
            throw new NotFoundException("Item no pedido não encontrado")
        }

        const order = await this.orderRepository.findById(fk_order);

        if (order.fk_orderstatus != "314e2828-1c69-11ee-be56-c691200020241") {
            throw new UnauthorizedException("Pedido não pode ser adulterado pois ja passou pelo status de pré-produção.")
        }

        await this.orderItemRepository.patchItemInOrder({ fk_categoryOrderItem, fk_order, fk_revenue, amountItem });
    }
}