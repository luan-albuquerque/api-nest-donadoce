import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { RevenuePerClientRepository } from 'src/modules/revenue-per-client/repository/contract/RevenuePerClientRepository';
import { CreateOrderAlternativeDto } from '../dto/create-order-alternative.dto';
import { CreateOrderCoffeDto } from '../dto/create-order-coffe.dto';
import * as dayjs from "dayjs"
import { CompanyRepository } from 'src/modules/company/repository/contract/CompanyRepository';

@Injectable()
export class CreateOrderCoffeService {

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly revenuesRepository: RevenuesRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly revenuePerClientRepository: RevenuePerClientRepository,
  ) { }


  async execute(fk_user: string, createOrderCoffeDto: CreateOrderCoffeDto) {
    const createOrderItemDtoAlt = []

    var valueTotal = 0
    const data = new Date();
    const revenueAll = await this.revenuesRepository.findByAllNotFilter();
    const interAll = await this.revenuePerClientRepository.findAllByUser(fk_user);
    if (createOrderCoffeDto.createOrderCoffeItemDto) {

      // const company = await this.companyRepository.findById(createOrderCoffeDto.fk_company);
      // if (!company) {
      //   throw new NotFoundException(`Unidade não encontrada`)

      // }

      await Promise.all(
        createOrderCoffeDto.createOrderCoffeItemDto.map(async (item) => {

          const revenue = revenueAll.find((iRevenue) => iRevenue.id === item.fk_revenue);
          if (!revenue) {
            throw new NotFoundException(`Receita não encontrada - fk_revenue: ${item.fk_revenue}`)
          }

          if (item.method_of_preparation != "frozen" && item.method_of_preparation != "roast") {
            throw new NotFoundException(`Method_of_preparation not found`)
          }

          const inter = interAll.find((iInter) => iInter.fk_revenue === item.fk_revenue);
          var value = revenue.value
          if (inter) {
            value = inter.unique_value;
          }

          if (item.amountItem > revenue.base_max_amount || item.amountItem < revenue.base_min_amount) {
            throw new NotFoundException(`Quantidade em receita ${revenue.description} excede os limites definidos.`)
          }


          valueTotal = (value * item.amountItem) + valueTotal;
          
          item.delivery_date = dayjs(item.delivery_date).utc(false).add(5, 'h').toDate();
          item.order_time  = dayjs(item.order_time).utc(false).toDate();
 
       
          const dat =  dayjs(`${item.delivery_date.getFullYear()}-${item.delivery_date.getMonth() + 1}-${item.delivery_date.getDate()} ${item.order_time.getHours()}:${item.order_time.getMinutes()}:${item.order_time.getSeconds()}`).toDate()
         
          createOrderItemDtoAlt.push({
            of_menu: true,
            amountItem: item.amountItem,
            dateOrderItem: dayjs().utc(true).toDate(),
            method_of_preparation: item.method_of_preparation,
            delivery_date: dat,
            homologate: "APROVADO",
            fk_categoryOrderItem: "coffe-be56-11ee-sdsd-024dca12034542",
            fk_revenue: item.fk_revenue,
            valueOrderItem: value
          })

        })
      );
 
    

      const createOrderAlternativeDto: CreateOrderAlternativeDto = {
        fk_orderstatus: "022ac120002-1c69-11ee-be56-0242ac120002",
        dateOrder: dayjs().utc(true).toDate(),
        valueOrder: valueTotal,
        fk_user: fk_user,
        fk_company: createOrderCoffeDto.fk_company,
        order_type: 'coffe',
        createOrderItemDto: createOrderItemDtoAlt,
      }

      await this.orderRepository.create(createOrderAlternativeDto)

    } else {
      throw new NotFoundException(`Itens não encontrado`)
    }

  }
}