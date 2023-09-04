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
import { CreateIngredientControlDto } from 'src/modules/ingredient_control/dto/create-ingredient_control.dto';


@Injectable()
export class CreateOrderService {

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly revenuesRepository: RevenuesRepository,
    private readonly revenuePerClientRepository: RevenuePerClientRepository,
    private readonly menuRepository: MenuRepository,
    private readonly categoryOrderItemRepository: CategoryOrderItemRepository,
    private ingredientControlRepository: IngredientControlRepository,
    private ingredientsRepository: IngredientsRepository
  ) { }


  async execute(fk_user: string, createOrderDto: CreateOrderDto) {
    const createOrderItemDtoAlt = []

    var valueTotal = 0
    const data = new Date();
    const revenueAll = await this.revenuesRepository.findByAllNotFilter();
    const categoryAll = await this.categoryOrderItemRepository.findAll();;
    const interAll = await this.revenuePerClientRepository.findAllByUser(fk_user);
    const menuSeleted = await this.menuRepository.findOne(createOrderDto.fk_menu);
    const revenuesAproved: { fk_revenue: string, amountItem: number }[] = [];
    if (createOrderDto.createOrderItemDto) {

      await Promise.all(
        createOrderDto.createOrderItemDto.map(async (item) => {

          const revenue = revenueAll.find((iRevenue) => iRevenue.id === item.fk_revenue);
          if (!revenue) {
            throw new NotFoundException(`Receita não encontrada - fk_revenue: ${item.fk_revenue}`)
          }

          const menu = menuSeleted.itemMenu.find((menuItemS) => menuItemS.fk_revenues === item.fk_revenue)

          if (!menu) {
            throw new NotFoundException(`Item não está no menu - fk_revenue: ${item.fk_revenue}`)
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
            of_menu: true,
            amountItem: item.amountItem,
            dateOrderItem: data,
            homologate: "APROVADO",
            fk_categoryOrderItem: item.fk_categoryOrderItem,
            fk_revenue: item.fk_revenue,
            valueOrderItem: value
          })

          revenuesAproved.push({
            fk_revenue: item.fk_revenue,
            amountItem: item.amountItem,
          })

        })
      );

      await Promise.all(
        createOrderDto.createOrderNotMenuItemDto.map(async (item) => {

          const revenue = revenueAll.find((iRevenue) => iRevenue.id === item.fk_revenue);
          if (!revenue) {
            throw new NotFoundException(`Receita não encontrada em itens fora do Menu - fk_revenue: ${item.fk_revenue}`)
          }
          console.log({ itenMenu: menuSeleted.itemMenu });

          const menu = menuSeleted.itemMenu.find((menuItemS) => menuItemS.fk_revenues === item.fk_revenue)

          if (menu) {
            throw new NotFoundException(`Item está no menu, verifique a lista de pedidos em Menu`)
          }

          const category = categoryAll.find((iCategory) => iCategory.id === item.fk_categoryOrderItem);
          if (!category) {
            throw new NotFoundException(`Category não encontrada em itens fora do Menu - fk_category: ${item.fk_categoryOrderItem}`)
          }
          const inter = interAll.find((iInter) => iInter.fk_revenue === item.fk_revenue);
          var value = revenue.value
          if (inter) {
            value = inter.unique_value;
          }

          valueTotal = value + valueTotal;

          createOrderItemDtoAlt.push({
            of_menu: false,
            homologate: "EM_HOMOLOGACAO",
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
        createOrderItemDto: createOrderItemDtoAlt,
      }



      await this.orderRepository.create(createOrderAlternativeDto)

      Promise.all(

        // Lista receitas aprovadas que foram e quantidade
        revenuesAproved.map(async (item) => {
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


        })

      )


    } else {
      throw new NotFoundException(`Itens não encontrado`)
    }

  }
}