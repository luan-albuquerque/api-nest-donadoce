import { Injectable } from "@nestjs/common";
import { ControlProductionRepository } from "../repository/contract/ControlProductionRepository";
import * as dayjs from "dayjs";
import { PatchSetControlProductionProductDto } from "../dtos/patch-set-control-production.dto";

@Injectable()
export class PatchUpdateSequencialService {

  constructor(
    private readonly controlProductionRepository: ControlProductionRepository
  ) { }

  async execute(data: PatchSetControlProductionProductDto[]) {
    // ete
    await Promise.all(
      data.map(async (item) => {
         await this.controlProductionRepository.updateSequencialProduct(item.id, item.set);
      })
    );



  }

}