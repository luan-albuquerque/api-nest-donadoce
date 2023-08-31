import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { OrderBatchRepository } from "../contract/OrderBatchRepository";
import { CreateOrderBatch } from "../../dto/create_order_batch.dto";
import { OrderBatch } from "../../entities/order_batch.entity";
import { FilterOrderBatch } from "../../dto/filter_order_batch.dto";
import { UpdateOrderBatch } from "../../dto/update_order_batch.dto";



@Injectable()
export class OrderBatchRepositoryInPrisma implements OrderBatchRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async update(id: string, updateOrderBatch: UpdateOrderBatch): Promise<void> {
        await this.prisma.orderBatch.update({
            where:{
                id,
            },
            data: {
                fk_client: updateOrderBatch.fk_client,
                invoice_file: updateOrderBatch.invoice_file,
                invoice_number: updateOrderBatch.invoice_number,
            }
        }).catch(() => {
            this.prisma.$disconnect()
        })
    }
    async findOneOrderBatch(id: string): Promise<OrderBatch> {
        var data: OrderBatch = await this.prisma.orderBatch.findUnique({
            select: {
                id: true,
                invoice_file: true,
                fk_client: true,
                invoice_number: true,
                numberOrderBatch: true,
                OrderBatchItem: true,
            },
            where: {
               id,
            },
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }

    async create(createOrderBatch: CreateOrderBatch): Promise<void> {
        await this.prisma.orderBatch.create({
            data: {
                fk_client: createOrderBatch.fk_client,
                invoice_file: createOrderBatch.invoice_file,
                invoice_number: createOrderBatch.invoice_number,
                OrderBatchItem: {
                    createMany: {
                        data: createOrderBatch.createOrderBatchItem,
                        skipDuplicates: true,
                    }
                }
            }
        }).catch(() => {
            this.prisma.$disconnect()
        })
    }
 

    async findAllOrderBatch({ fk_client, invoice_number, numberOrderBatch, skip, take }: FilterOrderBatch): Promise<OrderBatch[]> {
        var data: OrderBatch[] = await this.prisma.orderBatch.findMany({
            select: {
                id: true,
                invoice_file: true,
                fk_client: true,
                invoice_number: true,
                numberOrderBatch: true,
                OrderBatchItem: true,
            },
            where: {
                fk_client: {
                    contains: fk_client,
                },
                invoice_number: {
                    contains: invoice_number,
                },
                numberOrderBatch: numberOrderBatch,
            },
            skip,
            take
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }


}