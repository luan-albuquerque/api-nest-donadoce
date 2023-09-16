import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByAdminOrderDTO } from '../dto/list-by-admin-order.dto';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { IngredientsRepository } from 'src/modules/ingredients/repository/contract/IngredientsRepository';
import { IngredientControlRepository } from 'src/modules/ingredient_control/repository/contract/IngredientControlRepository';
import * as dayjs from 'dayjs';
import { ControlProductionRepository } from 'src/modules/control_production/repository/contract/ControlProductionRepository';
import { CategoryOrderItemRepository } from 'src/modules/category_order_items/repository/contract/CategoryOrderItemRepository';


@Injectable()
export class PatchOrderStatusService {

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly revenuesRepository: RevenuesRepository,
    private readonly ingredientsRepository: IngredientsRepository,
    private readonly ingredientControlRepository: IngredientControlRepository,
    private readonly controlProductionRepository: ControlProductionRepository,
    private readonly categoryOrderItemRepository: CategoryOrderItemRepository,

  ) { }

  async execute(id: string, fk_order_status: string) {

    try {

      const order = await this.orderRepository.findById(id)


      if (order.fk_orderstatus == "1c69c120002-575f34-1c69-be56-0242ac1201c69") {
        throw new UnauthorizedException("Pedido ja foi entregue")
      }

      if (fk_order_status == "022ac120002-1c69-11ee-be56-0242ac120002") {
        throw new UnauthorizedException("Pedido não pode possui o status inicial")
      }

      
      if (fk_order_status == "55b4c3a6-4e7f-31ee-be56-0242ac12000224fe4") {
        throw new UnauthorizedException("Pedido não pode ser cancelado através dessa rota")
      }


      if (fk_order_status == "45690813-1c69-11ee-be56-c691200020241") {

        
      Promise.all(

        // Lista receitas aprovadas que foram e quantidade
        order.orderItem.map(async (item) => {
          // Buscar dados de receitas , como ingredientes que compoem ela
          const revenue = await this.revenuesRepository.findByOneWithIngredients(item.fk_revenue);

          // Mapear o ingredientes que fazem a receita
          revenue.ingredients_Revenues.map(async (ingredientesItem) => {
            // Busco dados mais especificos do ingrediente - Quantidade total em estoque
            const findIngredient = await this.ingredientsRepository.findById(ingredientesItem.fk_ingredient)

            // Pego o valor atual de itens daquele ingredientes no estoque
            var actulQtd: number = findIngredient.amount_actual

            // Sinalizo uma retirada de ingredientes_control - (estoque de ingredientes)
            await this.ingredientControlRepository.createFluxoIngredient({
              amount: ingredientesItem.amount_ingredient * item.amountItem,
              is_output: true,
              fk_ingredient: ingredientesItem.fk_ingredient,
              unit_of_measurement: findIngredient.unit_of_measurement,
              unitary_value: 0
            })
            // Montar calculo de acordo com a quantidade de receita que o cliente pediu
            actulQtd = actulQtd - (ingredientesItem.amount_ingredient * item.amountItem);
            // Atualizar retirada 
            await this.ingredientsRepository.updateAmount(findIngredient.id, actulQtd);
          })

         const dataaa = dayjs(dayjs(item.delivery_date).format("YYYY-MM-DDT00:00:00Z")).hour(-4).toDate()
          const c = await this.controlProductionRepository.findItemProduction({
            fk_categoryOrderItem: item.fk_categoryOrderItem,
            fk_revenue: item.fk_revenue,
            delivery_date: dataaa
          })

          if (c) {

            await this.controlProductionRepository.updateItemProduction({
              amount_actual: c.amount_actual + item.amountItem,
              id: c.id,
            })

          } else {

            const seq = await this.controlProductionRepository.findSeqControlProductProductInDay(dataaa) || 0;
            const category = await this.categoryOrderItemRepository.findOne(item.fk_categoryOrderItem);

            await this.controlProductionRepository.createItemProduction({
              seq: seq + 1,
              amount_actual: item.amountItem,
              delivery_date: dataaa,
              description: revenue.description,
              fk_revenue: revenue.id,
              description_category: category.description,
              fk_categoryOrderItem: category.id,
              order_type: "programmed"
            });
          }
          

        })
      )


      // Controle de Produção Progamado

        
      }
      


      
      await this.orderRepository.patchStatus(id, fk_order_status);

    } catch (error) {
      throw new InternalServerErrorException("Erro no servidor")
    }


  }
}