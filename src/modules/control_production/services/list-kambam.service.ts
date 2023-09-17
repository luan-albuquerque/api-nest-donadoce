import { Injectable } from "@nestjs/common";
import { ControlProductionRepository } from "../repository/contract/ControlProductionRepository";
import { OrderType } from "src/modules/order/types/ordertype.type";
import * as dayjs from "dayjs";

@Injectable()
export class ListKambaService {

  constructor(
    private readonly controlProductionRepository: ControlProductionRepository
  ) { }

  async execute(order: OrderType){

    return  await this.controlProductionRepository.findAllControlProductionProduct(order);
  }

}