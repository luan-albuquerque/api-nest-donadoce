import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { CategoryOrderItemRepository } from 'src/modules/category_order_items/repository/contract/CategoryOrderItemRepository';
import { RevenuePerClientRepository } from 'src/modules/revenue-per-client/repository/contract/RevenuePerClientRepository';
import { CreateOrderAlternativeDto } from '../dto/create-order-alternative.dto';
import { MenuRepository } from 'src/modules/menu/repository/contract/MenuRepository';
import { IngredientsRepository } from 'src/modules/ingredients/repository/contract/IngredientsRepository';
import { IngredientControlRepository } from 'src/modules/ingredient_control/repository/contract/IngredientControlRepository';
import * as dayjs from "dayjs"
import { ControlProductionRepository } from 'src/modules/control_production/repository/contract/ControlProductionRepository';
import { ClientsRepository } from 'src/modules/clients/repository/contract/ClientsRepository';
import { CreateOrderCoffeDto } from '../dto/create-order-coffe.dto';

@Injectable()
export class CreateOrderCoffeService {

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly revenuesRepository: RevenuesRepository,
    private readonly revenuePerClientRepository: RevenuePerClientRepository,
  ) { }


  async execute(fk_user: string, createOrderCoffeDto: CreateOrderCoffeDto) {
    const createOrderItemDtoAlt = []

    var valueTotal = 0
    const data = new Date();
    const revenueAll = await this.revenuesRepository.findByAllNotFilter();
    const interAll = await this.revenuePerClientRepository.findAllByUser(fk_user);
    if (createOrderCoffeDto.createOrderCoffeItemDto) {

      await Promise.all(
        createOrderCoffeDto.createOrderCoffeItemDto.map(async (item) => {

          const revenue = revenueAll.find((iRevenue) => iRevenue.id === item.fk_revenue);
          if (!revenue) {
            throw new NotFoundException(`Receita não encontrada - fk_revenue: ${item.fk_revenue}`)
          }
        
          const inter = interAll.find((iInter) => iInter.fk_revenue === item.fk_revenue);
          var value = revenue.value
          if (inter) {
            value = inter.unique_value;
          }

          valueTotal = value + valueTotal;

          createOrderItemDtoAlt.push({
            of_menu: true,
            amountItem: item.amountItem,
            dateOrderItem: data,
            method_of_preparation: item.method_of_preparation,
            delivery_date: item.delivery_date,
            homologate: "APROVADO",
            fk_categoryOrderItem: "coffe-be56-11ee-sdsd-024dca12034542",
            fk_revenue: item.fk_revenue,
            valueOrderItem: value
          })

        })
      );


      const createOrderAlternativeDto: CreateOrderAlternativeDto = {
        fk_orderstatus: "022ac120002-1c69-11ee-be56-0242ac120002",
        dateOrder: data,
        valueOrder: valueTotal,
        fk_user: fk_user,
        order_type: 'coffe',
        createOrderItemDto: createOrderItemDtoAlt,
      }

      await this.orderRepository.create(createOrderAlternativeDto)

    } else {
      throw new NotFoundException(`Itens não encontrado`)
    }

  }
}