import { Injectable } from "@nestjs/common";
import { FiltersMenuDTO } from "../dto/filters-menu.dto";
import { MenuRepository } from "../repository/contract/MenuRepository";
import { Menu } from "../entities/menu.entity";
import { RevenuePerClientRepository } from "src/modules/revenue-per-client/repository/contract/RevenuePerClientRepository";
import { UserRepository } from "src/modules/users/repository/contract/UserRepository";

@Injectable()
export class FindAllMenuService {

    constructor(
        private readonly menuRepository: MenuRepository,
        private readonly userRepository: UserRepository,
        private readonly revenuePerClientRepository: RevenuePerClientRepository
    ) { }

    async execute(filtersMenuDTO: FiltersMenuDTO): Promise<Menu[]> {

        const user = await this.userRepository.findById(filtersMenuDTO.userId);

        if (user.is_client) {
            const revenuePerClient = await this.revenuePerClientRepository.findAllNoFilter()
            const menus = await this.menuRepository.findAllToClient(filtersMenuDTO)


            Promise.all(
                menus.map((item) => {
                    item.itemMenu.map((receitas) => {
                        var revenue = revenuePerClient.find((busca) => receitas.fk_revenues === busca.fk_revenue && busca.fk_client === user.id)
                        if (revenue) {
                            receitas.revenue_value_on_the_day = revenue.unique_value
                        }
                    })
                })
            );
            return menus;
        } else if (user.is_admin) {
            
            const menus = await this.menuRepository.findAll(filtersMenuDTO)


            return menus;
        }


    }

}