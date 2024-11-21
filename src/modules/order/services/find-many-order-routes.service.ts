import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { CompanyRepository } from 'src/modules/company/repository/contract/CompanyRepository';
import * as dayjs from 'dayjs';
import { Company } from 'src/modules/company/entities/company.entity';
import { OrderType } from '../types/ordertype.type';
import { ClientCompany } from 'src/modules/clients_company/entities/clients_company.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { OrderItem } from 'src/modules/order_item/entities/order-item.entity';

interface ListDelivery {
  orderNumber: number;
  orderId: string;
  clientId: string;
  user?: User;
  company: Company;
  companyClient: ClientCompany;
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
      const dataa = new Date();
      const startOfDay = dayjs(`${dataa.getFullYear()}-${dataa.getMonth() + 1}-${dataa.getDate()} 00:00:00`).utc(true).toDate();
      const endOfDay = dayjs(`${dataa.getFullYear()}-${dataa.getMonth() + 1}-${dataa.getDate()} 23:59:59`).utc(true).toDate();
      const endOfDay2 = dayjs(`${dataa.getFullYear()}-${dataa.getMonth() + 1}-${dataa.getDate() + 1} 23:59:59`).utc(true).toDate();

      const orders = await this.orderRepository.findManyOrderInRoute(
        startOfDay,
        endOfDay,
        orderType,
      );
 
      const oListDelivery: ListDelivery[] = [];

      for (const order of orders) {
        for (const orderItem of order.orderItem) {
          
          if ((order.fk_orderstatus == '45690813-1c69-11ee-be56-c691200020241' 
            && orderItem.fk_categoryOrderItem == '491aebc2-1c69-11ee-be56-0242ac120002') 
            || order.fk_orderstatus == '789850813-1c69-11ee-be56-c691200020241' &&
              orderItem.delivery_date >= startOfDay && orderItem.delivery_date <= endOfDay
            || order.fk_orderstatus == '789850813-1c69-11ee-be56-c691200020241' &&
            orderItem.delivery_date >= startOfDay && orderItem.delivery_date <= endOfDay2 
            && orderItem.fk_categoryOrderItem == '491aebc2-1c69-11ee-be56-0242ac120002'
          ) {
            

          

            const companyClient = order?.company?.Client_Company
              ? order.company.Client_Company.find((c) => c.fk_company === order.fk_company)
              : undefined;
            
              var item =  [{
                revenueDescription: orderItem.revenues.description,
                amountItem: orderItem.amountItem,
                homologate: orderItem.homologate,
                valueOrderItem: orderItem.valueOrderItem,
                method_of_preparation: orderItem.method_of_preparation,
                comment: orderItem.comment 
              }]

            const deliveryEntry: ListDelivery = {
              orderNumber: order.numberOrder,
              orderId: order.id,
              clientId: order.fk_user,
              user: order.user,
              company: order.company,
              companyClient,
              item,
              deliveryDate: orderItem.delivery_date,
              priority: order.company.priority,
            };

      
            const exists = oListDelivery.find(
              (e) => e.company.id === order.fk_company && e.deliveryDate.getTime() == orderItem.delivery_date.getTime(),
            );
            
            if (!exists) {
              oListDelivery.push(deliveryEntry);
            }else{
              exists.item.push(item[0]);
            }
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
