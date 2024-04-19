import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { OrderItemRepository } from "../repository/contract/OrderItemRepository";
import { OrderRepository } from "src/modules/order/repository/contract/OrderRepository";
import { AddItemInOrderDTO } from "../dto/add-item-in-order-programmed.dto";
import { MenuRepository } from "src/modules/menu/repository/contract/MenuRepository";
import * as dayjs from "dayjs"
import { CategoryOrderItemRepository } from "src/modules/category_order_items/repository/contract/CategoryOrderItemRepository";
import { RevenuePerClientRepository } from "src/modules/revenue-per-client/repository/contract/RevenuePerClientRepository";
import { RevenuesRepository } from "src/modules/revenue/repository/contract/RevenuesRepository";


@Injectable()
export class AddItemInOrderProgrammedService {

    constructor(
        private readonly orderItemRepository: OrderItemRepository,
        private readonly orderRepository: OrderRepository,
        private readonly menuRepository: MenuRepository,
        private readonly revenuePerClientRepository: RevenuePerClientRepository,
        private readonly categoryOrderItemRepository: CategoryOrderItemRepository,
        private readonly revenuesRepository: RevenuesRepository,
    ) { }

    async execute(fk_user: string, { amountItem, fk_categoryOrderItem, fk_menu, fk_order, fk_revenue, method_of_preparation }: AddItemInOrderDTO) {


        const revenue = await this.revenuesRepository.findByOne(fk_revenue);
        const categoryAll = await this.categoryOrderItemRepository.findAllProg();
        var valueTotal = 0

        const orderItem = this.orderItemRepository.findOneOrderItem(fk_categoryOrderItem, fk_order, fk_revenue);
        if (!orderItem) {
            throw new NotFoundException("Pedido não encontrado")
        }



        const menuSeleted = await this.menuRepository.findOne(fk_menu);
        if (!menuSeleted) {
            throw new NotFoundException("Pedido não encontrado")
        }



        const menuOfRevenue = menuSeleted.itemMenu.find((menuItemS) => menuItemS.fk_revenues === fk_revenue)

        if (!menuOfRevenue) {
            throw new NotFoundException(`Item não está no cardapio - fk_revenue: ${fk_revenue}`)
        }

        const category = categoryAll.find((iCategory) => iCategory.id === fk_categoryOrderItem);
        if (!category) {
            throw new NotFoundException(`Categoria não encontrada em itens fora do cardapio. Error: fk_category: ${fk_categoryOrderItem}`)
        }

        const order = await this.orderRepository.findById(fk_order);

        if (order.fk_orderstatus != "314e2828-1c69-11ee-be56-c691200020241") {
            throw new UnauthorizedException("Pedido não pode ser adulterado pois ja passou pelo status de pré-produção.")
        }

        const orderVerify = order.orderItem.find((orderItem) => orderItem.fk_revenue === fk_revenue && orderItem.fk_categoryOrderItem == fk_categoryOrderItem)

        if (orderVerify) {
            throw new NotFoundException("Item ja está incluso no pedido com a mesma categoria")
        }

        const interAll = await this.revenuePerClientRepository.findAllByUser(fk_user);
        const inter = interAll.find((iInter) => iInter.fk_revenue === fk_revenue);
        var value = revenue.value

        if (inter) {
            value = inter.unique_value;
        }

        valueTotal = value + valueTotal;

        await this.orderItemRepository.addItemInOrder({
            amountItem,
            dateOrderItem: new Date(),
            fk_categoryOrderItem,
            fk_menu,
            fk_order,
            fk_revenue,
            valueOrderItem: valueTotal,
            method_of_preparation,
            delivery_date: dayjs(`${menuSeleted.dateMenu.getFullYear()}-${menuSeleted.dateMenu.getMonth() + 1}-${menuSeleted.dateMenu.getDate()} ${category.time.getHours()}:${category.time.getMinutes()}:${category.time.getSeconds()}`).toDate(),

        })


    }
}