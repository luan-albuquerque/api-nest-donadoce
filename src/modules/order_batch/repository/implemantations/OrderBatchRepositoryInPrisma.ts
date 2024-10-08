import { BadRequestException, Injectable } from "@nestjs/common";
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
    async findOneOrderBatchForCsv(id: string): Promise<OrderBatch> {
        var data: OrderBatch = await this.prisma.orderBatch.findUnique({
            select: {
                id: true,
                file_invoice: true,
                file_payment_voucher: true,
                fk_client: true,
                invoice_number: true,
                numberOrderBatch: true,
                OrderBatchItem: {
                    select:{
                        created_at: true,
                        deleted_at: true,
                        fk_orderBatch: true,
                        fk_order: true,
                        order: {
                            include: {
                                company: true,
                                user: {
                                    include:{
                                       Client_Company: true,
                                       Clients: true,
                                    },
                                },
                                orderStatus: true,
                                orderItem: {
                                    include:{
                                        revenues: true,
                                    }
                                }
                            }
                        }
                    },
                    where:{
                        deleted_at: null
                    }
                },
            },
            where: {
                id,
            },
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async delete(id: string): Promise<void> {
        await this.prisma.orderBatch.delete({
            where: {
                id,
            },
        }).catch(() => {
            this.prisma.$disconnect()

        });
    }
    async addPaymentVoucher(id: string, file: string): Promise<void> {
        await this.prisma.orderBatch.update({
            where: {
                id,
            },
            data: {
                file_payment_voucher: file
            }
        }).catch(() => {
            this.prisma.$disconnect()
        })
    }

    async addInvoice(id: string, file: string, numberInvoice: string): Promise<void> {
        await this.prisma.orderBatch.update({
            where: {
                id,
            },
            data: {
                file_invoice: file,
                invoice_number: numberInvoice
            }
        }).catch(() => {
            this.prisma.$disconnect()
        })
    }
    //Não atualizei por conta de não saber se ia usar
    async update(id: string, updateOrderBatch: UpdateOrderBatch): Promise<void> {
        await this.prisma.orderBatch.update({
            where: {
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
        try {
            
            await this.prisma.orderBatch.create({
                data: {
                    fk_client: createOrderBatch.fk_user,
                    fk_company: createOrderBatch.fk_company,
                    file_invoice: createOrderBatch.file_invoice,
                    invoice_number: createOrderBatch.invoice_number,
                    fk_user_open_orderbatch: createOrderBatch.userOpenOrderBatch,
                    file_payment_voucher: null,
                    OrderBatchItem: {
                        createMany: {
                            data: createOrderBatch.createOrderBatchItem,
                            skipDuplicates: true,
                        }
                    }
                }
            }).catch((e) => {
                console.log({e});
                
                this.prisma.$disconnect()
            })
        } catch (error) {
            throw new BadRequestException(error)
        }
 
    }


    async findAllOrderBatch({ fk_client, fk_company, invoice_number, numberOrderBatch, skip, take }: FilterOrderBatch): Promise<OrderBatch[]> {
        var data = await this.prisma.orderBatch.findMany({
            select: {
                id: true,
                file_invoice: true,
                file_payment_voucher: true,
                fk_client: true,
                invoice_number: true,
                numberOrderBatch: true,
                user:{
                    select:{
                        Clients: true,
                        Client_Company: {
                          include: {
                            company: true,
                          }
                        },
                        id: true,
                        email: true,
                        is_company: true,
                        is_enabled: true,
                        is_client: true,
                    }
                },
                OrderBatchItem: {
                    select: {

                        fk_order: true,
                        order:{
                            select:{
                                id: true,
                                dateOrder: true,
                                file_caution: true,
                                numberOrder: true,
                                valueOrder: true,
                                is_created_by_company: true,
                        
                            }
                        },
                    }
                },
            },
            where: {
                fk_client: {
                    contains: fk_client,
                },
                fk_company: {
                    contains: fk_company,
                },
                invoice_number: {
                    contains: invoice_number,
                },
                numberOrderBatch: numberOrderBatch != undefined ? Number(numberOrderBatch): numberOrderBatch,
            },
            skip,
            take
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }


}