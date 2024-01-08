import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByAdminOrderDTO } from '../dto/list-by-admin-order.dto';
import { CompanyRepository } from 'src/modules/company/repository/contract/CompanyRepository';
import * as dayjs from "dayjs"
import { Company } from 'src/modules/company/entities/company.entity';
import { OrderType } from '../types/ordertype.type';
import { cwd } from 'process';


interface ListDelivery {
  orderNumber: number
  orderId: string
  clientId: string
  company: Company
  revenueDescription: string
  deliveryDate: Date
  quantity?: number
}

@Injectable()
export class FindManyOrderRoutesService {

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly companyRepository: CompanyRepository
  ) { }

  async execute(orderType: OrderType) {

    try {


      const orders = await this.orderRepository.findManyOrderInRoute(
        dayjs(dayjs().format("YYYY-MM-DDT00:00:00Z")).utc(true).toDate(),
        dayjs(dayjs().format("YYYY-MM-DDT00:00:00Z")).utc(true).add(1, 'day').toDate(),
        orderType
      );

      const oListDelivery: ListDelivery[] = [];
      const seq = 0;
      await Promise.all(
        orders.map((order) => {
          order.orderItem.map((orderItem) => {


            var revenueE = oListDelivery.find((e) => e.revenueDescription == orderItem.revenues.description && e.company.id == order.fk_company);

            if (revenueE) {
              const comparacaoData = orderItem.delivery_date.getTime() - orderItem.delivery_date.getTime();
              if (comparacaoData == 0) {
                revenueE.quantity = revenueE.quantity + orderItem.amountItem;
                return;
              }
            }

            oListDelivery.push({
              orderNumber: order.numberOrder,
              orderId: order.id,
              clientId: order.fk_user,
              company: order.company,
              revenueDescription: orderItem.revenues.description,
              deliveryDate: orderItem.delivery_date,
              quantity: orderItem.amountItem,
            })
          })
        })
      );



      await Promise.all(

        oListDelivery.sort((a, b) => {
          // Comparação por data
          const comparacaoData = a.deliveryDate.getTime() - b.deliveryDate.getTime();



          // Se as datas forem iguais, compare por prioridade
          return comparacaoData !== 0 ? comparacaoData : a.company.priority - b.company.priority;
        })
      );

      return oListDelivery;


    } catch (error) {

      throw new InternalServerErrorException("Erro: " + error)
    }


  }
}