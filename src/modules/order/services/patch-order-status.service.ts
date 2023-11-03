import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByAdminOrderDTO } from '../dto/list-by-admin-order.dto';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { IngredientsRepository } from 'src/modules/ingredients/repository/contract/IngredientsRepository';
import { IngredientControlRepository } from 'src/modules/ingredient_control/repository/contract/IngredientControlRepository';
import * as dayjs from 'dayjs';
import { ControlProductionRepository } from 'src/modules/control_production/repository/contract/ControlProductionRepository';
import { CategoryOrderItemRepository } from 'src/modules/category_order_items/repository/contract/CategoryOrderItemRepository';
import { Order } from '../entities/order.entity';
import { ClientsRepository } from 'src/modules/clients/repository/contract/ClientsRepository';
import { Client } from 'src/modules/clients/entities/client.entity';


@Injectable()
export class PatchOrderStatusService {

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly revenuesRepository: RevenuesRepository,
    private readonly ingredientsRepository: IngredientsRepository,
    private readonly ingredientControlRepository: IngredientControlRepository,
    private readonly controlProductionRepository: ControlProductionRepository,
    private readonly categoryOrderItemRepository: CategoryOrderItemRepository,
    private readonly clientsRepository: ClientsRepository,

  ) { }

  async execute(id: string, fk_order_status: string) {


    const order = await this.orderRepository.findById(id);
    const client = await this.clientsRepository.findById(order.fk_user);

    if (!client) {
      throw new UnauthorizedException("Usuario que realizou o pedido não pertencem a cadeia de usuarios cliente")
    }

    if (order.fk_orderstatus == "1c69c120002-575f34-1c69-be56-0242ac1201c69") {
      throw new UnauthorizedException("Pedido ja foi entregue")
    }

    if (fk_order_status == "022ac120002-1c69-11ee-be56-0242ac120002") {
      throw new UnauthorizedException("Pedido não pode possui o status inicial")
    }
    if((
     // Solicitado
      order.fk_orderstatus == "314e2828-1c69-11ee-be56-c691200020241" || 
     // Pré - Produção   
      order.fk_orderstatus == "11ee6828-1c69-11ee-be56-c691200020241" ||
     // Agendado     
      order.fk_orderstatus == "022ac120002-1c69-11ee-be56-0242ac120002"  ||
     // em pre processamento
      order.fk_orderstatus == "45690813-1c69-11ee-be56-c691200020241"
    ) && 
    // Entregue
    fk_order_status == "1c69c120002-575f34-1c69-be56-0242ac1201c69" || 
      // Revisao admin
    fk_order_status == "016b9c84-4e7f-81ee-be56-0242ac1200022fe2af" || 
    // Finalizado
    fk_order_status == "fer762d-erjr345d4s5f-dfkj3kd-39dsu49dshn3"){
      throw new BadRequestException("Status como Solicitado Pre-Produção, Agendado e Em Processamento não podem ser mudado direatamente para Entregue, Revisao Adm ou Finalizado")

    }

    if (fk_order_status == "55b4c3a6-4e7f-31ee-be56-0242ac12000224fe4") {
      if (
        //Pré-Produção || Agendado || Solicitado
        order.fk_orderstatus != "314e2828-1c69-11ee-be56-c691200020241" &&
        order.fk_orderstatus != "11ee6828-1c69-11ee-be56-c691200020241" &&
        order.fk_orderstatus != "022ac120002-1c69-11ee-be56-0242ac120002") {
        throw new BadRequestException("Pedido não pode ser mais cancelado devido o status não está mais disponivel para cancelamento")
      }
;
      await this.orderRepository.patchStatus(id, "55b4c3a6-4e7f-31ee-be56-0242ac12000224fe4");

      return;

    }

  // em processamento
    if (fk_order_status == "45690813-1c69-11ee-be56-c691200020241") {

      await this.processIngredientes(order);
      await this.processProductionByProduct(order);
      await this.processProductionByClient(order, client);

    }

    await this.orderRepository.patchStatus(id, fk_order_status);



  }


  private async processProductionByClient(order: Order, client: Client) {

    await Promise.all(

      // Lista receitas aprovadas que foram e quantidade
      order.orderItem.map(async (item) => {

        if (item.homologate == "EM_HOMOLOGACAO") {
          return;
        }

        // Buscar dados de receitas , como ingredientes que compoem ela
        const revenue = await this.revenuesRepository.findByOne(item.fk_revenue);

        const dataaa = dayjs(dayjs(item.delivery_date).format("YYYY-MM-DDT00:00:00Z")).utc(true).toDate()
        // CONTROL PRODUCTION PRODUCT
        const c = await this.controlProductionRepository.findItemProductionClient({
          fk_categoryOrderItem: item.fk_categoryOrderItem,
          fk_revenue: item.fk_revenue,
          delivery_date: dataaa,
          fk_user: order.fk_user,
        })

        if (c) {
          await this.controlProductionRepository.updateItemProductionClient({
            amount_actual: c.amount_actual + item.amountItem,
            id: c.id,
          })

        } else {

          const seq = 0
          const category = await this.categoryOrderItemRepository.findOne(item.fk_categoryOrderItem);

          await this.controlProductionRepository.createItemProductionTypeClient({
            seq,
            amount_actual: item.amountItem,
            delivery_date: dataaa,
            description: revenue.description,
            fk_revenue: revenue.id,
            description_category: category.description,
            fk_categoryOrderItem: category.id,
            order_type: order.order_type,
            fk_user: client.id,
            corporate_name: client.corporate_name,
          });
        }
      })
    )
  }
  private async processProductionByProduct(order: Order) {

    await Promise.all(

      // Lista receitas aprovadas que foram e quantidade
      order.orderItem.map(async (item) => {

        if (item.homologate == "EM_HOMOLOGACAO") {
          return;
        }

        // Buscar dados de receitas , como ingredientes que compoem ela
        const revenue = await this.revenuesRepository.findByOne(item.fk_revenue);

        const dataaa = dayjs(dayjs(item.delivery_date).format("YYYY-MM-DDT00:00:00Z")).utc(true).toDate()
        // CONTROL PRODUCTION PRODUCT
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

          await this.controlProductionRepository.createItemProductionTypeProduct({
            seq: seq + 1,
            amount_actual: item.amountItem,
            delivery_date: dataaa,
            description: revenue.description,
            fk_revenue: revenue.id,
            description_category: category.description,
            fk_categoryOrderItem: category.id,
            order_type: order.order_type
          });
        }
      })
    )
  }
  private async processIngredientes(order: Order) {
    await Promise.all(
      order.orderItem.map(async (item) => {

        if (item.homologate == "EM_HOMOLOGACAO") {
          return;
        }
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
      }));
  }
}