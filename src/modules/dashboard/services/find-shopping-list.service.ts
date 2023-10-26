import { Injectable, NotFoundException } from "@nestjs/common";
import { RevenuesRepository } from "src/modules/revenue/repository/contract/RevenuesRepository";
import * as dayjs from "dayjs";
import { IngredientsRepository } from "src/modules/ingredients/repository/contract/IngredientsRepository";
import { UserRepository } from "src/modules/users/repository/contract/UserRepository";
import { OrderRepository } from "src/modules/order/repository/contract/OrderRepository";
import { OrderType } from "src/modules/order/types/ordertype.type";

@Injectable()
export class FindShoppingListService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly orderRepository: OrderRepository,
        private readonly ingredientsRepository: IngredientsRepository,
    ) { }

    async execute(orderStatus: string = "", client: string = "", orderType: string = undefined) {

   
        if (client != "") {
            const findClient = await this.userRepository.findById(client);
            if (!findClient) {
                throw new NotFoundException("Cliente não encontrado")
            }
        }

        if (orderStatus != "") {
            const findStatus = await this.orderRepository.findOrderStatus(orderStatus);
            if (!findStatus) {
                throw new NotFoundException("Status não encontrado")
            }

        }
        var orderTypeOfi: OrderType = undefined
        if(orderType != undefined){
    
          orderType == "programmed" ? orderTypeOfi = "programmed" : orderType == "coffe" ? orderTypeOfi = "coffe" : orderTypeOfi = undefined;
        }
        return await this.ingredientsRepository.findManyOrderInProcessToListShopping(orderStatus, client, orderTypeOfi);

    }

}