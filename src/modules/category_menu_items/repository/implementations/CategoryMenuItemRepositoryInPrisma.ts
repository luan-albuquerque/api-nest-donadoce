import { Injectable } from "@nestjs/common";
import { CategoryMenuItemRepository } from "../contract/CategoryMenuItemRepository";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { CategoryMenuItem } from "../../entities/category_menu_item.entity";

@Injectable()
export class CategoryMenuItemRepositoryInPrisma implements CategoryMenuItemRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async findAll(): Promise<CategoryMenuItem[]> {
        return await this.prisma.categoryMenuItem.findMany({
            orderBy: {
                description: "asc"
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async findOne(id: string): Promise<CategoryMenuItem> {
        return await this.prisma.categoryMenuItem.findUnique({
            where: {
                id
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }

}