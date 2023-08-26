import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { OrderBatchItemRepository } from "../contract/OrderBatchItemRepository";
import { CreateOrderBatchItemManual } from "../../dto/create_order_batch_item_manual.dto";
import { RemoveOrderBatchItem } from "../../dto/remove_order_batch_item.dto";
import { OrderBatchItem } from "../../entities/order_batch_item.entity";



@Injectable()
export class OrderBatchItemRepositoryInPrisma implements OrderBatchItemRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async findBy(fk_order: string, fk_orderBatch: string): Promise<OrderBatchItem> {
        try {
            return await this.prisma.orderBatchItem.findUnique({
                where: {
                    fk_order_fk_orderBatch: {
                        fk_order,
                        fk_orderBatch
                    }
                }
            });
        } catch (error) {
            throw new InternalServerErrorException(error)
        } finally {
            this.prisma.$disconnect()
        }
    }
    async findAll(): Promise<OrderBatchItem[]> {
        try {
            return await this.prisma.orderBatchItem.findMany({
                include: {
                    order: true,
                    orderBatch: true
                }
            });
        } catch (error) {
            throw new InternalServerErrorException(error)
        } finally {
            this.prisma.$disconnect()
        }
    }
    async addItem(data: CreateOrderBatchItemManual[]): Promise<void> {
        try {
            await this.prisma.orderBatchItem.createMany({
                data,
                skipDuplicates: true,
            });
        } catch (error) {
            throw new InternalServerErrorException(error)
        } finally {
            this.prisma.$disconnect()
        }
    }
    async removeItem({ fk_order, fk_orderBatch }: RemoveOrderBatchItem): Promise<void> {
        try {
            await this.prisma.orderBatchItem.delete({
                where: {
                    fk_order_fk_orderBatch: {
                        fk_order,
                        fk_orderBatch
                    }
                },
            });
        } catch (error) {
            throw new InternalServerErrorException(error)
        } finally {
            this.prisma.$disconnect()
        }
    }


}