import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../contract/OrderRepository";
import { CreateOrderAlternativeDto } from "../../dto/create-order-alternative.dto";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { ListByClientOrderDTO } from "../../dto/list-by-client-order.dto";
import { OrderAlternative } from "../../entities/order-alternative.entity";
import { ListByAdminOrderDTO } from "../../dto/list-by-admin-order.dto";
import { OrderAdmin } from "../../entities/order-admin.entity";
import { Order } from "../../entities/order.entity";


@Injectable()
export class OrderRepositoryInPrisma implements OrderRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async findManyOrderByClientNotOrderBatch(fk_client: string): Promise<Order[]> {
        const data = await this.prisma.order.findMany({
            where: {
                AND: {
                    fk_user: fk_client,
                    OrderBatchItem: null,
                }
            },
            include: {
                OrderBatchItem: {
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