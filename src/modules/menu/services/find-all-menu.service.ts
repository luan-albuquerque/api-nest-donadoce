import { Injectable } from "@nestjs/common";
import { FiltersMenuDTO } from "../dto/filters-menu.dto";
import { MenuRepository } from "../repository/contract/MenuRepository";
import { Menu } from "../entities/menu.entity";
import { RevenuePerClientRepository } from "src/modules/revenue-per-client/repository/contract/RevenuePerClientRepository";

@Injectable()
export class FindAllMenuService {

    constructor(
        private readonly menuRepository: MenuRepository,
        private readonly revenuePerClientRepository: RevenuePerClientRepository
    ) { }

    async execute(filtersMenuDTO: FiltersMenuDTO): Promise<Menu[]> {
    const revenuePerClient = await this.revenuePerClientRepository.findAllNoFilter()
    const menus =  await this.menuRepository.findAll(filtersMenuDTO)

     Promise.all(
        menus.map((item)=>{
            item.itemMenu.map((receitas)=>{
               var revenue = revenuePerClient.find((busca)=> receitas.fk_revenues === busca.fk_revenue)
               if(revenue){
                receitas.revenue_value_on_the_day = revenue.unique_value
               }
            })
        })
     );

     return menus;
    }

}