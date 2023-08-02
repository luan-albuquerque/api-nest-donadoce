import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { CategoryOrderItemRepository } from 'src/modules/category_order_items/repository/contract/CategoryOrderItemRepository';
import { RevenuePerClientRepository } from 'src/modules/revenue-per-client/repository/contract/RevenuePerClientRepository';
import { CreateOrderAlternativeDto } from '../dto/create-order-alternative.dto';


@Injectable()
export class CreateOrderService {

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly revenuesRepository: RevenuesRepository,
    private readonly revenuePerClientRepository: RevenuePerClientRepository,
    private readonly categoryOrderItemRepository: CategoryOrderItemRepository
  ) { }

  
  async execute(fk_user: string, createOrderDto: CreateOrderDto) {
    const createOrderItemDtoAlt = []
    
    var valueTotal = 0
    const data = new Date();
    if (createOrderDto.createOrderItemDto) {
      const revenueAll = await this.revenuesRepository.findByAll();
      const categoryAll = await this.categoryOrderItemRepository.findAll();;
      const interAll = await this.revenuePerClientRepository.findAllByUser(fk_user)
      await Promise.all(
        createOrderDto.createOrderItemDto.map(async (item) => {
          
          const revenue = revenueAll.find((iRevenue) => iRevenue.id === item.fk_revenue);
          if (!revenue) {
            throw new NotFoundException(`Receita não encontrada - fk_revenue: ${item.fk_revenue}`)
          }

          const category = categoryAll.find((iCategory) => iCategory.id === item.fk_categoryOrderItem);
          if (!category) {
            throw new NotFoundException(`Category não encontrada - fk_category: ${item.fk_categoryOrderItem}`)
          }
          const inter = interAll.find((iInter) => iInter.fk_revenue === item.fk_revenue);
          var value = revenue.value
          if (inter) {
            value = inter.unique_value;
          }

          valueTotal = value + valueTotal;

          createOrderItemDtoAlt.push({
            amountItem: item.amountItem,
            dateOrderItem: data,
            fk_categoryOrderItem: item.fk_categoryOrderItem,
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
      createOrderItemDto: createOrderItemDtoAlt
    }

     
      await this.orderRepository.create(createOrderAlternativeDto)
    


    } else {
      throw new NotFoundException(`Itens não encontrado`)
    }

  }
}