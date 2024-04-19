import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { OrderItemRepository } from "../contract/OrderItemRepository";
import { PatchHomologateOrder } from "src/modules/order/dto/patch-homologate-order.dto";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import * as dayjs from "dayjs";
import { OrderItem } from "src/modules/order_item/entities/order-item.entity";
import { AddItemInOrderDTO } from "../../dto/add-item-in-order-programmed.dto";
import { RemoveItemInOrderDTO } from "../../dto/remove-item-in-order-programmed.dto";
import { PatchItemInOrderDTO } from "../../dto/patch-item-in-order-programmed.dto";


@Injectable()
export class OrderItemRepositoryInPrisma implements OrderItemRepository {

    constructor(
        private readonly prisma: PrismaService
    ) { }
    async removeItemInOrder({ fk_categoryOrderItem, fk_order, fk_revenue }: RemoveItemInOrderDTO): Promise<void> {
        await this.prisma.orderItem.delete({
            where: {
                fk_revenue_fk_order_fk_categoryOrderItem: {
                    fk_categoryOrderItem,
                    fk_order,
                    fk_revenue
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }

    async addItemInOrder({ amountItem, fk_categoryOrderItem, fk_order, fk_revenue, method_of_preparation, dateOrderItem, delivery_date, fk_menu, valueOrderItem }: AddItemInOrderDTO): Promise<void> {
        await this.prisma.orderItem.create({
            data: {
                amountItem,
                method_of_preparation,
                of_menu: true,
                valueOrderItem,
                delivery_date,
                dateOrderItem,
                fk_categoryOrderItem,
                fk_order,
                fk_revenue,

            }

        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async patchItemInOrder({amountItem,fk_categoryOrderItem,fk_order,fk_revenue}: PatchItemInOrderDTO): Promise<void> {
        await this.prisma.orderItem.update({
            data:{
                amountItem,
            },
            where: {
                fk_revenue_fk_order_fk_categoryOrderItem: {
                    fk_categoryOrderItem,
                    fk_order,
                    fk_revenue
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }

    async patchTrayOrder(id: string, amount_of_tray: number, amount_of_boxes: number): Promise<void> {

        try {
            await this.prisma.order.updateMany({
                data: {
                    amount_of_tray,
                    amount_of_boxes,
                },
                where: {
                    id: id,
                }
            })

        } catch (error) {
            throw new InternalServerErrorException("Erro no Banco de dados: " + error)
        } finally {
            this.prisma.$disconnect()
        }
    }
    async findOneOrderItem(fk_categoryOrderItem: string, fk_order: string, fk_revenue: string): Promise<OrderItem> {
        const data = await this.prisma.orderItem.findUnique({
            where: {
                fk_revenue_fk_order_fk_categoryOrderItem: {
                    fk_categoryOrderItem,
                    fk_order,
                    fk_revenue
                },
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }
    async UpdateOrderItemHomologate({ fk_categoryOrderItem, fk_order, fk_revenue, homologate }: PatchHomologateOrder): Promise<void> {
        try {
            await this.prisma.orderItem.update({
                data: {
                    homologate,
                },
                where: {
                    fk_revenue_fk_order_fk_categoryOrderItem: {
                        fk_categoryOrderItem,
                        fk_order,
                        fk_revenue
                    }
                }
            })

        } catch (error) {
            throw new InternalServerErrorException("Erro no Banco de dados: " + error)
        } finally {
            this.prisma.$disconnect()
        }

    }
    async findAllOrdersInProcess(): Promise<any> {


        const data = await this.prisma.orderItem.groupBy({
            by: ['fk_revenue', 'fk_categoryOrderItem'],
            _sum: {
                amountItem: true,
                valueOrderItem: true,
            },
            where: {
                OR: [
                    {
                        dateOrderItem: {
                            gte:  dayjs(dayjs().format("YYYY-MM-DDT00:00:00Z")).utc(true).toDate(),
                            lte:  dayjs(dayjs().format("YYYY-MM-DDT00:00:00Z")).utc(true).add(1, 'day').toDate()
                        },
                        OR: [
                            {
                                fk_categoryOrderItem: "518a6828-1c69-11ee-be56-0242ac120002"
                            },
                            {
                                fk_categoryOrderItem: "57c25f34-1c69-11ee-be56-0242ac120002"
                            }
                        ]
                    },
                    {
                        dateOrderItem: {
                            gte: dayjs(dayjs().format("YYYY-MM-DDT00:00:00Z")).utc(true).add(1, 'day').toDate(),
                            lte: dayjs(dayjs().format("YYYY-MM-DDT00:00:00Z")).utc(true).add(2, 'day').toDate()
                        },
                        fk_categoryOrderItem: "491aebc2-1c69-11ee-be56-0242ac120002"
                    }
                ]
            },


        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }

}