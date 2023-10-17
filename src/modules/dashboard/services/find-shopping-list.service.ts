import { Injectable, NotFoundException } from "@nestjs/common";
import { RevenuesRepository } from "src/modules/revenue/repository/contract/RevenuesRepository";
import * as dayjs from "dayjs";

@Injectable()
export class FindShoppingListService {

    constructor(
        private readonly revenuesRepository: RevenuesRepository,
    ) { }

    async execute() {

       
    }

}