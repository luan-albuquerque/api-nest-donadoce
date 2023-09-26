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

    //Não atualizei por conta de não saber se ia usar
    async update(id: string, updateOrderBatch: UpdateOrderBatch): Promise<void> {
        await this.prisma.orderBatch.update({
            where:{
                id,
            },
            data: {
                fk_client: updateOrderBatch.fk_client,
                file_invoice: updateOrderBatch.invoice_file,
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
                file_invoice: true,
                file_caution: true,
                file_payment_voucher: true,
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
                fk_user_open_orderbatch: createOrderBatch.userOpenOrderBatch,
                fk_client: createOrderBatch.fk_client,
                file_invoice: createOrderBatch.file_invoice,
                file_caution: createOrderBatch.file_caution,
                file_payment_voucher: createOrderBatch.file_payment_voucher,
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
                file_invoice: true,
                file_caution: true,
                file_payment_voucher: true,
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