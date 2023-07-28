import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../contract/OrderRepository";
import { CreateOrderAlternativeDto } from "../../dto/create-order-alternative.dto";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { ListByClientOrderDTO } from "../../dto/list-by-client-order.dto";
import { OrderAlternative } from "../../entities/order-alternative.entity";
import { ListByAdminOrderDTO } from "../../dto/list-by-admin-order.dto";


@Injectable()
export class OrderRepositoryInPrisma implements OrderRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async findMany({ desc_user, numberOrder, skip, take }: ListByAdminOrderDTO): Promise<OrderAlternative[]> {
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
    async findManyByClient({ fk_user, numberOrder, skip, take }: ListByClientOrderDTO): Promise<OrderAlternative[]> {

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