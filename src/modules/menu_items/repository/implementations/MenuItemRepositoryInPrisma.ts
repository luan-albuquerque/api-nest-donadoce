import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { MenuItem } from "../../entities/menu_item.entity";
import { MenuItemRepository } from "../contract/MenuItemRepository";


export class MenuItemRepositoryInPrisma implements MenuItemRepository {
    constructor(private prisma: PrismaService) { }
    async findItensByMenu(fk_menu: string): Promise<MenuItem[]> {
        const data = await this.prisma.itemMenu.findMany({
       
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }

    async findOne(id: string): Promise<MenuItem[]> {
        const data = await this.prisma.itemMenu.findMany({
            where: {
                fk_revenues: id
            },
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }



}