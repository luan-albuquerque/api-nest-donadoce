import { Injectable } from "@nestjs/common";
import { ControlProductionRepository } from "../repository/contract/ControlProductionRepository";
import { OrderType } from "src/modules/order/types/ordertype.type";
import * as dayjs from "dayjs";
import { ModeKambamType } from "../types/modekambam.type";


@Injectable()
export class ListKambaService {

  constructor(
    private readonly controlProductionRepository: ControlProductionRepository
  ) { }

  async execute(order: OrderType, modeKambamType: ModeKambamType) {
    if (modeKambamType == "product") {
      return await this.controlProductionRepository.findAllControlProductionProduct(order);
    } else if (modeKambamType == "client") {
      return await this.controlProductionRepository.findAllControlProductionClient(order);
    }

  }

}