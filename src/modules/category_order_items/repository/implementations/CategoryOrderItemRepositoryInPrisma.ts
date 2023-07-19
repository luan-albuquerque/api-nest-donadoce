import { Injectable } from "@nestjs/common";
import { CategoryOrderItemRepository } from "../contract/CategoryOrderItemRepository";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { CategoryOrderItem } from "../../entities/category_menu_item.entity";


@Injectable()
export class CategoryOrderItemRepositoryInPrisma implements CategoryOrderItemRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
  
    async findAll(): Promise<CategoryOrderItem[]> {
        return await this.prisma.categoryOrderItem.findMany({
            orderBy: {
                description: "asc"
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async findOne(id: string): Promise<CategoryOrderItem> {
        return await this.prisma.categoryOrderItem.findUnique({
            where: {
                id
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }

}