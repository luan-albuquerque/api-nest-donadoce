import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { CompanyRepository } from 'src/modules/company/repository/contract/CompanyRepository';
import * as dayjs from 'dayjs';
import { Company } from 'src/modules/company/entities/company.entity';
import { OrderType } from '../types/ordertype.type';
import { ClientCompany } from 'src/modules/clients_company/entities/clients_company.entity';
import { User } from 'src/modules/users/entities/user.entity';

interface ListDelivery {
  orderNumber: number;
  orderId: string;
  clientId: string;
  user?: User;
  company: Company;
  companyClient: ClientCompany;
  revenueDescription: string;
  deliveryDate: Date;
  // item: any;
  priority: number;
}

@Injectable()
export class FindManyOrderRoutesService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(orderType: OrderType) {
    try {
      const dataa = new Date()
      const startOfDay =  dayjs(`${dataa.getFullYear()}-${dataa.getMonth() + 1}-${dataa.getDate()} 00:00:00`).utc(true).toDate()
      const endOfDay =  dayjs(`${dataa.getFullYear()}-${dataa.getMonth() + 1}-${dataa.getDate()} 23:59:59`).utc(true).toDate()
       
      const orders = await this.orderRepository.findManyOrderInRoute(
        startOfDay,
        endOfDay,
        orderType,
      );

      const oListDelivery: ListDelivery[] = [];

      for (const order of orders) {  

        for (const orderItem of order.orderItem) {
          const companyClient = order?.company?.Client_Company.find(
            (c) => c.fk_company === order.fk_company,
          );
          

          const deliveryEntry: ListDelivery = {
            orderNumber: order.numberOrder,
            orderId: order.id,
            clientId: order.fk_user,
            user: order.user,
            company: order.company,
            companyClient,
            revenueDescription: orderItem.revenues.description,
            deliveryDate: orderItem.delivery_date,
            // item: orderItem,
            priority: order.company.priority,
          };


          // Checa por uma entrada existente com base na companhia e data de entrega
          const exists = oListDelivery.some(
            (e) =>
              e.company.id === order.fk_company &&
              e.deliveryDate.getTime() === orderItem.delivery_date.getTime(),
          );

          

          if (!exists) {
            oListDelivery.push(deliveryEntry);
          }
        }
        
        delete order.company.Client_Company;
      }
     
      // Ordena as entregas por prioridade e data de entrega
      oListDelivery.sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return a.deliveryDate.getTime() - b.deliveryDate.getTime();
      });

      return oListDelivery;
    } catch (error) {
      throw new InternalServerErrorException('Erro: ' + error.message);
    }
  }
}
