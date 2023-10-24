import { Injectable, NotFoundException } from "@nestjs/common";
import { RevenuesRepository } from "src/modules/revenue/repository/contract/RevenuesRepository";
import * as dayjs from "dayjs";
import { IngredientsRepository } from "src/modules/ingredients/repository/contract/IngredientsRepository";
import { UserRepository } from "src/modules/users/repository/contract/UserRepository";
import { OrderRepository } from "src/modules/order/repository/contract/OrderRepository";

@Injectable()
export class FindBoxAndTrayList {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly orderRepository: OrderRepository,
        private readonly ingredientsRepository: IngredientsRepository,
    ) { }

    async execute(client: string) {

    }

}