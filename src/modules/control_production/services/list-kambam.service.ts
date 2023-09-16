import { Injectable } from "@nestjs/common";
import { ControlProductionRepository } from "../repository/contract/ControlProductionRepository";
import * as dayjs from "dayjs";

@Injectable()
export class ListKambaService {

  constructor(
    private readonly controlProductionRepository: ControlProductionRepository
  ) { }

  async execute(date: Date){
      

    return  await this.controlProductionRepository.findAllControlProductionProduct(date);
  }

}