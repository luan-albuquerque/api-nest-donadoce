import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/modules/users/repository/contract/UserRepository";
import { OrderRepository } from "../repository/contract/OrderRepository";
import { IngredientsRepository } from "src/modules/ingredients/repository/contract/IngredientsRepository";
import * as dayjs from "dayjs"


@Injectable()
export class FindExportListFaturamento {

constructor(
    private readonly userRepository: UserRepository,
    private readonly orderRepository: OrderRepository,
    private readonly ingredientsRepository: IngredientsRepository,
) { }

async execute(data1: Date = undefined, data2: Date = undefined, orderStatus: string = "", client: string = "", orderType: string = "") {

    const dataInitial = dayjs(data1).utc(true).format("YYYY-MM-DD")
    const dataFinal = dayjs(data2).utc(true).format("YYYY-MM-DD")



    if (client != "") {
        const findClient = await this.userRepository.findById(client);
        if (!findClient) {
            throw new NotFoundException("Cliente não encontrado")
        }
    }

   

   const data =  await this.orderRepository.findListExportFaturamento(orderStatus, client, orderType.toLowerCase(), dataInitial, dataFinal)
 

  
  return data;

 }




}

