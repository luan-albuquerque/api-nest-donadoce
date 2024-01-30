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

    async execute(data: Date = undefined, orderStatus: string = "", client: string = "", orderType: string = undefined) {

        const dataInitial = dayjs(data).utc(true).format("YYYY-MM-DD")
        const dataFinal = dayjs(data).add(1, 'day').utc(true).format("YYYY-MM-DD")



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

            // Se pedido não possuir status Solicitado, Agendado ou Pré-Produção ele não pode retornar a lista
            if (
                //Pré-Produção || Agendado || Solicitado
                orderStatus != "314e2828-1c69-11ee-be56-c691200020241" &&
                orderStatus != "11ee6828-1c69-11ee-be56-c691200020241" &&
                orderStatus != "022ac120002-1c69-11ee-be56-0242ac120002"
            ) {
                return [];
            }

        }





        var dadosDaBanco = await this.ingredientsRepository.findManyOrderInProcessToListShopping(orderStatus, client, orderType.toLowerCase(), dataInitial, dataFinal);
        return await this.sumValuesByDescription(dadosDaBanco);
    }



    private async sumValuesByDescription(items) {
        const result = [];
    
        items.forEach(item => {
            const { description, count_rev, quantity_to_buy_no_stock, value_prediction_no_stock, quantity_to_buy, value_prediction } = item;
            const findDescription = result.find((i) => i.description == description);
            if (!findDescription) {
                result.push({
                    description,
                    count_rev,
                    quantity_to_buy_no_stock: parseFloat(quantity_to_buy_no_stock),
                    value_prediction_no_stock:  parseFloat(value_prediction_no_stock),
                    quantity_to_buy: parseFloat(quantity_to_buy),
                    value_prediction: parseFloat(value_prediction)
                });
                return;
            }
    
           findDescription.count_rev += count_rev;
           findDescription.quantity_to_buy_no_stock += parseFloat(quantity_to_buy_no_stock);
           findDescription.value_prediction_no_stock += parseFloat(value_prediction_no_stock);
           findDescription.quantity_to_buy += parseFloat(quantity_to_buy);
           findDescription.value_prediction += parseFloat(value_prediction);
        });
    
        return result;
    }
    


}