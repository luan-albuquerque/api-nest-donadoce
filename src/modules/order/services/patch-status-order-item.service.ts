import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByAdminOrderDTO } from '../dto/list-by-admin-order.dto';
import { PatchStatusOrderItemDto } from '../dto/patch-status-order-item.';
import { IngredientsRepository } from 'src/modules/ingredients/repository/contract/IngredientsRepository';
import { IngredientControlRepository } from 'src/modules/ingredient_control/repository/contract/IngredientControlRepository';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';


@Injectable()
export class PatchStatusOrderItemService {

  constructor(
    private readonly orderRepository: OrderRepository,
    private ingredientControlRepository: IngredientControlRepository,
    private readonly revenuesRepository: RevenuesRepository,
    private ingredientsRepository: IngredientsRepository
  ) { }

  async execute(id: string, { fk_categoryOrderItem, fk_revenue, status_order_item }: PatchStatusOrderItemDto) {

    try {

      const order = await this.orderRepository.findById(id)
      if (!order) {
        throw new NotFoundException("Pedido não encontrado")
      }


      const orderItem = await this.orderRepository.findOneOrderItem(fk_categoryOrderItem, id, fk_revenue);
      if (orderItem.homologate != "EM_HOMOLOGACAO") {
        throw new BadRequestException("Item em Pedido ja foi atualizado.")
      }

      if (status_order_item == "EM_HOMOLOGACAO" || status_order_item != "APROVADO" && status_order_item != "REPROVADO") {
        throw new BadRequestException("Operação não permitida.")
      }



      await this.orderRepository.patchStatusOrderItem(id, { fk_categoryOrderItem, fk_revenue, status_order_item }).then(async () => {
        // Caso o pedido fora do estoque seja aprovado 
        if (status_order_item == "APROVADO") {
          // Buscar ingredientes da receitas
          const revenue = await this.revenuesRepository.findByOneWithIngredients(fk_revenue);

          //Mapear Ingredientes de receita 
          revenue.ingredients_Revenues.map(async (ingredientesItem) => {

            //Buscar dados de ingredientes
            const findIngredient = await this.ingredientsRepository.findById(ingredientesItem.fk_ingredient)

            // Pego o valor atual de itens daquele ingredientes no estoque
            var actulQtd: number = findIngredient.amount_actual

            // Sinalizo uma retirada de ingredientes_control - (estoque de ingredientes)
            await this.ingredientControlRepository.createFluxoIngredient({
              amount: ingredientesItem.amount_ingredient * orderItem.amountItem,
              is_output: true,
              fk_ingredient: ingredientesItem.fk_ingredient,
              unit_of_measurement: findIngredient.unit_of_measurement,
              unitary_value: 0
            })
            // Montar calculo de acordo com a quantidade de receita que o cliente pediu
            actulQtd = actulQtd - (ingredientesItem.amount_ingredient * orderItem.amountItem);

            // Atualizar retirada 
            await this.ingredientsRepository.updateAmount(findIngredient.id, actulQtd);

          });
        }
      })



    } catch (error) {
      throw new InternalServerErrorException(error)
    }


  }
}