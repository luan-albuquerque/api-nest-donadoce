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


@Injectable()
export class OrderRepositoryInPrisma implements OrderRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async patchTrayOrder(id: string, amount_of_tray: number): Promise<void> {

        try {
            await this.prisma.order.updateMany({
                data: {
                    amount_of_tray,
                },
                where: {
                    id: id,
                }
            })

        } catch (error) {
            console.log("aqui" + error);
            
             throw new InternalServerErrorException("Erro no Banco de dados: " + error)
        } finally {
            this.prisma.$disconnect()
        }
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
        const data = await this.prisma.order.update({
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
                AND: {
                    fk_user: fk_client,
                    orderBatchItem: null,
                }
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
                        categoryOrderItem: {
                            select: {
                                description: true,
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

    async create({ createOrderItemDto, dateOrder, fk_user, fk_orderstatus, valueOrder }: CreateOrderAlternativeDto): Promise<void> {
        await this.prisma.order.create({
            data: {
                fk_user,
                fk_orderstatus,
                valueOrder,
                dateOrder,
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
                orderItem: {
                    select: {
                        categoryOrderItem: {
                            select: {
                                description: true,
                            }
                        },
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