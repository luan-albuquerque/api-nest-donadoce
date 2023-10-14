import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { OrderRepository } from "../contract/OrderRepository";
import { CreateOrderAlternativeDto } from "../../dto/create-order-alternative.dto";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { ListByClientOrderDTO } from "../../dto/list-by-client-order.dto";
import { OrderAlternative } from "../../entities/order-alternative.entity";
import { ListByAdminOrderDTO } from "../../dto/list-by-admin-order.dto";
import { OrderAdmin } from "../../entities/order-admin.entity";
import { Order } from "../../entities/order.entity";
import { PatchStatusOrderItemDto } from "../../dto/patch-status-order-item.";
import { PatchHomologateOrder } from "../../dto/patch-homologate-order.dto";
import { OrderItem } from "../../../order_item/entities/order-item.entity";


@Injectable()
export class OrderRepositoryInPrisma implements OrderRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async patchStatusByClient(id: string, fk_status_order: string, comment: string): Promise<void> {
        await this.prisma.order.update({
            data: {
                fk_orderstatus: fk_status_order,
                comment_by_client: comment
            },
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    

    async addPaymentVoucherInOrder(id: string, file_payment_voucher: string): Promise<void> {
        await this.prisma.order.update({
            data: {
                file_payment_voucher,
            },
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

    }

    async addInvoiceInOrder(id: string, file_invoice: string, number_invoice: string): Promise<void> {
        await this.prisma.order.update({
            data: {
                file_invoice,
                invoice_number: number_invoice,
            },
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async addCautionInOrder(id: string, file_caution: string): Promise<void> {
        await this.prisma.order.update({
            data: {
                file_caution,
            },
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

    }

    
   
    
   
    async patchStatusOrderItem(id: string, { fk_categoryOrderItem, fk_revenue, status_order_item }: PatchStatusOrderItemDto): Promise<void> {

        await this.prisma.orderItem.updateMany({
            data: {

                homologate: status_order_item as any
            },
            where: {
                fk_order: id,
                fk_revenue,
                fk_categoryOrderItem,
                homologate: "EM_HOMOLOGACAO",
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async patchStatus(id: string, fk_status_order: string): Promise<void> {
        await this.prisma.order.update({
            data: {
                fk_orderstatus: fk_status_order,
            },
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async findById(id: string): Promise<Order> {
        const data = await this.prisma.order.findUnique({
            include: {
                orderItem: true,
            },
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }
    async findManyOrderByClientNotOrderBatch(fk_client: string): Promise<Order[]> {
        const data = await this.prisma.order.findMany({
            where: {
                OR: [
                    {
                        fk_user: fk_client,
                        orderBatchItem: null,
                    },
                    {
                        fk_user: fk_client,
                        orderBatchItem: {
                            is_removed: true,
                        },
                    }
                ]
            },
            include: {
                orderBatchItem: {
                    include: {
                        orderBatch: true,
                    }
                },
            },
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }
    async findOne(numberOrder: number): Promise<Order[]> {
        const data = await this.prisma.order.findMany({
          
            where: {
                numberOrder,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }
    async findManyNotFilter(): Promise<Order[]> {
        const data = await this.prisma.order.findMany().finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }
    async findMany({ desc_user, numberOrder, skip, take, order_status }: ListByAdminOrderDTO): Promise<OrderAdmin[]> {
        const data = await this.prisma.order.findMany({
            select: {
                id: true,
                dateOrder: true,
                numberOrder: true,
                order_type: true,
                amount_of_tray: true,
                amount_of_boxes: true,
                comment_by_client: true, 
                file_invoice: true,
                file_payment_voucher: true,
                invoice_number: true,
                fk_orderstatus: true,
                fk_user: true,
                file_caution: true,
                user: {

                    select: {
                        Clients: {
                            select: {
                                corporate_name: true
                            }
                        }
                    }
                },
                orderItem: {
                    select: {
                        homologate: true,
                        of_menu: true,
                        method_of_preparation: true,
                        delivery_date: true,
                        categoryOrderItem: {
                            select: {
                                description: true,
                                time: true,
                            }
                        },
                        amountItem: true,
                        dateOrderItem: true,
                        revenues: {
                            select: {
                                description: true,
                                imagem: true,
                            }
                        },
                        valueOrderItem: true,
                    }
                },
                valueOrder: true,
                orderStatus: {
                    select: {
                        description: true,
                    }
                }
            },
            skip,
            take,
            where: {
                fk_orderstatus: order_status,
                user: {
                    OR: [
                        {
                            Clients: {
                                corporate_name: {
                                    contains: desc_user,
                                    mode: "insensitive"
                                }
                            },
                        },
                        {
                            Person: {
                                name: {
                                    contains: desc_user,
                                    mode: "insensitive"
                                }
                            }
                        }

                    ]
                },
                numberOrder,
            },
            orderBy: {
                numberOrder: "asc"
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }

    async create({ createOrderItemDto, dateOrder, fk_user, fk_orderstatus, valueOrder, order_type }: CreateOrderAlternativeDto): Promise<void> {

        await this.prisma.order.create({
            data: {
                fk_user,
                fk_orderstatus,
                valueOrder,
                dateOrder,
                order_type,
                orderItem: {
                    createMany: {
                        data: createOrderItemDto
                    }
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

    }
    async findManyByClient({ fk_user, numberOrder, skip, take, order_status }: ListByClientOrderDTO): Promise<OrderAlternative[]> {

        const data = await this.prisma.order.findMany({
            select: {
                id: true,
                dateOrder: true,
                numberOrder: true,
                order_type: true,
                file_caution: true,
                amount_of_boxes: true,
                comment_by_client: true,
                amount_of_tray: true,
                file_invoice: true,
                file_payment_voucher: true,
                invoice_number: true,
                orderItem: {
                    select: {
                        categoryOrderItem: {
                            select: {
                                description: true,
                            }
                        },
                        delivery_date: true,
                        method_of_preparation: true,
                        homologate: true,
                        of_menu: true,
                        amountItem: true,
                        dateOrderItem: true,
                        revenues: {
                            select: {
                                description: true,
                                imagem: true,
                            }
                        },
                        valueOrderItem: true,
                    }
                },
                valueOrder: true,
                orderStatus: {
                    select: {
                        description: true,
                    }
                }
            },
            skip,
            take,
            where: {
                fk_orderstatus: order_status,
                fk_user,
                numberOrder,
            },
            orderBy: {
                numberOrder: "asc"
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }

}