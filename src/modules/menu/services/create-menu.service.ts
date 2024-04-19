import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateMenuDto } from "../dto/create-menu.dto";
import { MenuRepository } from "../repository/contract/MenuRepository";
import { RevenuesRepository } from "src/modules/revenue/repository/contract/RevenuesRepository";
import * as dayjs from "dayjs";

@Injectable()
export class CreateMenuService {

    constructor(
        private readonly menuRepository: MenuRepository,
        private readonly revenuesRepository: RevenuesRepository,
    ) { }

    async execute({ dateMenu, createItensMenu }: CreateMenuDto) {


        

        const dataa = dayjs(dayjs(dateMenu).format("YYYY-MM-DDT00:00:00Z")).utc(true).toDate();

        const menu =  await this.menuRepository.findOneByDate(dataa);

        if(menu){
            throw new BadRequestException(`Ja existe um Menu com essa data - ${menu.dateMenu}`)
        }

        await Promise.all(
            createItensMenu.map(async (item) => {
                const revenue = await this.revenuesRepository.findByOne(item.fk_revenues)

                if (!revenue) {
                    throw new NotFoundException(`Receita não encontrada - fk_revenue: ${item.fk_revenues}`)
                }
                // Valor de Receita atual
                item.revenue_value_on_the_day = revenue.value
                if (item.max_amount <= 0) {
                    item.max_amount = revenue.base_max_amount
                }
                if (item.max_amount <= 0) {
                    item.min_amount = revenue.base_min_amount
                }

            })

        )



        await this.menuRepository.create({ 
            dateMenu: dayjs(dayjs(dateMenu).format("YYYY-MM-DDT00:00:00Z")).utc(true).toDate(),
            createItensMenu 
            })
    }

}