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
  item: any;
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
      // const routesPrioty = await this.companyRepository.findAllPriority();
      const orders = await this.orderRepository.findManyOrderInRoute(
        dayjs(dayjs().format('YYYY-MM-DDT00:00:00Z')).utc(true).toDate(),
        dayjs(dayjs().format('YYYY-MM-DDT00:00:00Z')).utc(true).add(1, 'day').toDate(),
        orderType,
      );

      const oListDelivery: ListDelivery[] = [];
      
      await Promise.all(
        orders.map((order) => {
          order.orderItem.map((orderItem) => {
            const companyClient = order.company.Client_Company.find(
              (c) => c.fk_company === order.fk_company,
            );

            const deliveryEntry = {
              orderNumber: order.numberOrder,
              orderId: order.id,
              clientId: order.fk_user,
              user: order.user,
              company: order.company,
              companyClient,
              revenueDescription: orderItem.revenues.description,
              deliveryDate: orderItem.delivery_date,
              item: order.orderItem,
              priority: order.company.priority,
            };

            // Check for existing entry based on company and delivery date
            const exists = oListDelivery.find(
              (e) =>
                e.company.id === order.fk_company &&
                e.deliveryDate.getTime() === orderItem.delivery_date.getTime(),
            );

            if (!exists) {
              oListDelivery.push(deliveryEntry);
            }
          });
        }),
      );

      // Sort the deliveries by priority (ascending) and delivery date (ascending)
      oListDelivery.sort((a, b) => {
        // Sort by priority first (ascending)
        if (a.priority !== b.priority) {
          return a.priority - b.priority; // Menor prioridade vem primeiro
        }
        // If priorities are the same, sort by delivery date (ascending)
        return a.deliveryDate.getTime() - b.deliveryDate.getTime(); // Menor data vem primeiro
      });

      return oListDelivery;
    } catch (error) {
      throw new InternalServerErrorException('Erro: ' + error);
    }
  }
}
