import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { CategoryOrderItemRepository } from 'src/modules/category_order_items/repository/contract/CategoryOrderItemRepository';
import { RevenuePerClientRepository } from 'src/modules/revenue-per-client/repository/contract/RevenuePerClientRepository';
import { CreateOrderAlternativeDto } from '../dto/create-order-alternative.dto';
import { MenuRepository } from 'src/modules/menu/repository/contract/MenuRepository';
import * as dayjs from "dayjs"
import { CompanyRepository } from 'src/modules/company/repository/contract/CompanyRepository';

@Injectable()
export class CreateOrderProgrammedService {

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly revenuesRepository: RevenuesRepository,
    private readonly revenuePerClientRepository: RevenuePerClientRepository,
    private readonly menuRepository: MenuRepository,
    private readonly categoryOrderItemRepository: CategoryOrderItemRepository,
    private readonly companyRepository: CompanyRepository,
  ) { }


  async execute(fk_user: string, createOrderDto: CreateOrderDto) {

    const createOrderItemDtoAlt = []
    var valueTotal = 0
    const data = new Date();
    const revenueAll = await this.revenuesRepository.findByAllNotFilter();
    const categoryAll = await this.categoryOrderItemRepository.findAllProg();;
    const interAll = await this.revenuePerClientRepository.findAllByUser(fk_user);
    const menuSeleted = await this.menuRepository.findOne(createOrderDto.fk_menu);
    const revenuesAproved: { fk_revenue: string, amountItem: number }[] = [];
    if (createOrderDto.createOrderItemDto) {

      await Promise.all(
        createOrderDto.createOrderItemDto.map(async (item) => {
          const company = await this.companyRepository.findById(createOrderDto.fk_company);
          if (!company) {
            throw new NotFoundException(`Unidade não encontrada`)

          }

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

          if (item.amountItem > revenue.base_max_amount || item.amountItem < revenue.base_min_amount) {
            throw new NotFoundException(`Quantidade em receita ${revenue.description} excede os limites definidos.`)
          }

          valueTotal = (value * item.amountItem) + valueTotal;

          createOrderItemDtoAlt.push({
            of_menu: true,
            amountItem: item.amountItem,
            dateOrderItem: dayjs().utc(true).toDate(),
            method_of_preparation: item.method_of_preparation,
            delivery_date: dayjs(`${menuSeleted.dateMenu.getFullYear()}-${menuSeleted.dateMenu.getMonth() + 1}-${menuSeleted.dateMenu.getDate()} ${category.time.getHours()}:${category.time.getMinutes()}:${category.time.getSeconds()}`).toDate(),
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
            throw new NotFoundException(`Receita não encontrada em itens fora do cardapio ${revenue.description}.  Error: fk_revenue: ${item.fk_revenue}`)
          }

          const menu = menuSeleted.itemMenu.find((menuItemS) => menuItemS.fk_revenues === item.fk_revenue)

          if (menu) {
            throw new NotFoundException(`Item está no menu, verifique a lista de pedidos em cardapio`)
          }

          const category = categoryAll.find((iCategory) => iCategory.id === item.fk_categoryOrderItem);
          if (!category) {
            throw new NotFoundException(`Categoria não encontrada em itens fora do cardapio. Error: fk_category: ${item.fk_categoryOrderItem}`)
          }
          const inter = interAll.find((iInter) => iInter.fk_revenue === item.fk_revenue);
          var value = revenue.value

          if (inter) {
            value = inter.unique_value;
          }

          valueTotal = (value * item.amountItem) + valueTotal;

          createOrderItemDtoAlt.push({
            of_menu: false,
            homologate: "EM_HOMOLOGACAO",
            method_of_preparation: item.method_of_preparation,
            delivery_date: dayjs(`${menuSeleted.dateMenu.getFullYear()}-${menuSeleted.dateMenu.getMonth() + 1}-${menuSeleted.dateMenu.getDate()} ${category.time.getHours()}:${category.time.getMinutes()}:${category.time.getSeconds()}`).toDate(),
            amountItem: item.amountItem,
            dateOrderItem: dayjs().utc(true).toDate(),
            fk_categoryOrderItem: item.fk_categoryOrderItem,
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
        fk_company: createOrderDto.fk_company,
        order_type: 'programmed',
        createOrderItemDto: createOrderItemDtoAlt,
      }



      await this.orderRepository.create(createOrderAlternativeDto)


    } else {
      throw new NotFoundException(`Itens não encontrado`)
    }

  }
}