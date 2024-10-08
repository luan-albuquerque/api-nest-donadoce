import { Injectable } from "@nestjs/common";
import { ControlProductionRepository } from "../repository/contract/ControlProductionRepository";
import * as dayjs from "dayjs";

@Injectable()
export class PatchUpdateSequencialClientService {

  constructor(
    private readonly controlProductionRepository: ControlProductionRepository
  ) { }

  async execute(id: string, seq: number){
      

    return  await this.controlProductionRepository.updateSequencialClient(id, seq);
  }

}