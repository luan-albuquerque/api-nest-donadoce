import { Injectable } from "@nestjs/common";
import { ControlProductionRepository } from "../repository/contract/ControlProductionRepository";
import { OrderType } from "src/modules/order/types/ordertype.type";
import * as dayjs from "dayjs";
import { ModeKambamType } from "../types/modekambam.type";

@Injectable()
export class ListKambaService {
  constructor(private readonly controlProductionRepository: ControlProductionRepository) {}

  async execute(order: OrderType, modeKambamType: ModeKambamType) {
    let productions;

    if (modeKambamType === "product") {
      productions = await this.controlProductionRepository.findAllControlProductionProduct(order);
      return this.groupProductionsByTime(productions);
    } else if (modeKambamType === "client") {
      productions = await this.controlProductionRepository.findAllControlProductionClient(order);
      return this.groupProductionsByTimeWithClient(productions);
    }

  }

  private groupProductionsByTime(productions) {
    const result = {
      "06:00-10:00": [],
      "10:00-13:00": [],
      "13:00-15:00": [],
    };

    productions.forEach(item => {
      console.log(item)
      const deliveryHour = dayjs(item.delivery_date).utc(false).hour();
      console.log(deliveryHour)

      if (deliveryHour >= 6 && deliveryHour < 10) {
        const c = result["06:00-10:00"].find(i => i.fk_revenue == item.fk_revenue)
        if(c){
          c.amount_actual = c.amount_actual + item.amount_actual
        } else {
          result["06:00-10:00"].push(item);
        }
      } else if (deliveryHour >= 10 && deliveryHour < 13) {

        const c = result["10:00-13:00"].find(i => i.fk_revenue == item.fk_revenue)
        if(c){
          c.amount_actual = c.amount_actual + item.amount_actual
        } else {
          result["10:00-13:00"].push(item);
        }

        // result["10:00-13:00"].push(item);
      } else if (deliveryHour >= 13 && deliveryHour < 15) {
        
        const c = result["13:00-15:00"].find(i => i.fk_revenue == item.fk_revenue)
        if(c){
          c.amount_actual = c.amount_actual + item.amount_actual
        } else {
          result["13:00-15:00"].push(item);
        }

        // result["13:00-15:00"].push(item);
      }
    });

    return result;
  }

  private groupProductionsByTimeWithClient(productions) {
    const result = {
      "06:00-10:00": [],
      "10:00-13:00": [],
      "13:00-15:00": [],
    };

    productions.forEach(item => {
      console.log(item)
      const deliveryHour = dayjs(item.delivery_date).utc(false).hour();
      console.log(deliveryHour)

      if (deliveryHour >= 6 && deliveryHour < 10) {
        const c = result["06:00-10:00"].find(i => i.fk_revenue == item.fk_revenue && item.fk_user == i.fk_user)
        if(c){
          c.amount_actual = c.amount_actual + item.amount_actual
        } else {
          result["06:00-10:00"].push(item);
        }
      } else if (deliveryHour >= 10 && deliveryHour < 13) {

        const c = result["10:00-13:00"].find(i => i.fk_revenue == item.fk_revenue && item.fk_user == i.fk_user)
        if(c){
          c.amount_actual = c.amount_actual + item.amount_actual
        } else {
          result["10:00-13:00"].push(item);
        }

        // result["10:00-13:00"].push(item);
      } else if (deliveryHour >= 13 && deliveryHour < 15) {
        
        const c = result["13:00-15:00"].find(i => i.fk_revenue == item.fk_revenue && item.fk_user == i.fk_user)
        if(c){
          c.amount_actual = c.amount_actual + item.amount_actual
        } else {
          result["13:00-15:00"].push(item);
        }

        // result["13:00-15:00"].push(item);
      }
    });

    return result;
  }
}
