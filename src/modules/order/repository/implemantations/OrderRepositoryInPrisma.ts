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
import { OrderType } from "../../types/ordertype.type";
import { OrderToBatchDTO } from "../../entities/order-to-batch.entity";
import { OrderBatchItem } from "src/modules/order_batch_item/entities/order_batch_item.entity";
import { Prisma } from "@prisma/client";


@Injectable()
export class OrderRepositoryInPrisma implements OrderRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async findManyTrayAndBoxes(take: number, skip: number, fk_orderstatus: string): Promise<any> {
        return await this.prisma.order.findMany({
           select:{
            numberOrder: true,
            dateOrder: true,
            orderItem: {
                select:{
                    revenues:{
                        select:{
                            description: true,
                        }
                    },
                    categoryOrderItem:{
                        select:{
                            description: true,
                        }
                    },
                    delivery_date: true,
                },
              
            },
            company: true,
            amount_of_boxes: true,
            amount_of_tray: true,
            orderStatus: true,
           },
           where:{
            fk_orderstatus, 
           },
           take, 
           skip,
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async findListExportFaturamento(orderStatus: string, client: string, orderType: string, dataInitial: string, dataFinal: string): Promise<any> {
        try {
            if (!dataInitial || !dataFinal) return;
            const sql = `
            select o."dateOrder" , o."numberOrder", os.description as "descriptionStatus", c.corporate_name as "client", c2.corporate_name  as "company" , 
            r.description , oi."amountItem", oi."valueOrderItem", 
            (oi."amountItem" * oi."valueOrderItem") as "valueItemTotal" from "Order" o 
            inner join "OrderItem" oi on oi.fk_order = o.id
            inner join "Client" c on o.fk_user = c.id
            inner join "Company" c2 on o.fk_company  = c2.id 
            inner join  "OrderStatus" os on os.id = o.fk_orderstatus
            inner join "Revenues" r on oi.fk_revenue = r.id 
            where 
            CAST(o."order_type"  AS VARCHAR(25)) like '%${orderType}%' and
            (oi.delivery_date >= '${dataInitial}' and oi.delivery_date <= '${dataFinal}' ) and o.fk_orderstatus like '%${orderStatus}%' 
            and o.fk_user like '%${client}%'
            order by o."dateOrder" desc;
            `;

            const result = await this.prisma.$queryRaw(Prisma.raw(sql)).finally(() => {
                this.prisma.$disconnect()
            });

            return result;
        } catch (error) {
            console.log(error);

        }
    }
    async findOrderUtilizetedInOrderBatch(fk_order: string): Promise<OrderBatchItem> {
        const data = await this.prisma.orderBatchItem.findUnique({
            where: {
                fk_order,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }
    async findManyAllToBatch({ skip, take }: ListByAdminOrderDTO,  where: any): Promise<OrderToBatchDTO[]> {

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
                    select:{
                     is_company: true,
                     is_client: true,
                     is_enabled: true,
                     email: true,
                     Clients: true,
                     Client_Company: {
                         select:{
                             company: true,
                         }
                     }    
                    }
                 },
                orderBatchItem: {
                    select: {
                        orderBatch: {
                            select: {
                                file_invoice: true,
                                file_payment_voucher: true,
                                fk_client: true,
                                fk_user_open_orderbatch: true,
                                invoice_number: true,
                                numberOrderBatch: true,
                                user: {
                                   select:{
                                    is_company: true,
                                    is_client: true,
                                    is_enabled: true,
                                    email: true,
                                    Clients: true,
                                    Client_Company: {
                                        select:{
                                            company: true,
                                        }
                                    }    
                                   }
                                },
                                userBatch: {
                                    select: {
                                        Clients: {
                                            select: {
                                                corporate_name: true,
                                            }
                                        }
                                    }
                                }
                            }
                        }
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
            where,
            orderBy: {
                numberOrder: "asc"
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }
    async findManyAllFilter({ desc_user, fk_client, numberOrder, orderType, order_status, skip, take }: ListByAdminOrderDTO, where: any): Promise<OrderAdmin[]> {

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
                is_created_by_company: true,
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
                        comment: true,
                        method_of_preparation: true,
                        delivery_date: true,
                        categoryOrderItem: {
                            select: {
                                id: true,
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
            where,
            orderBy: {
                numberOrder: "asc"
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }
    async findOrderStatus(fk_status: string): Promise<boolean> {
        const orderStatus = await this.prisma.orderStatus.findUnique({
            where: {
                id: fk_status,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return orderStatus != undefined ? true : false
    }

    async findManyOrderInRoute(date_inicial: Date, date_final: Date, orderType: OrderType): Promise<Order[]> {
        return await this.prisma.order.findMany({
            include: {
                orderItem: {
                    include: {
                        revenues: true,
                    },
                },
                company: {
                    select: {
                        id: true,
                        address: true,
                        cep: true,
                        cnpj: true,
                        uf: true,
                        updateAt: true,
                        priority: true,
                        district: true,
                        corporate_name: true,
                        createdAt: true,
                        county: true,
                        Client_Company: true,
                    }
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        Clients: true,
                        is_enabled: true,
                        is_client: true,
                        is_company: true,
                    }
                },

            },
            where: {
                fk_orderstatus: "789850813-1c69-11ee-be56-c691200020241",
                orderItem: {
                    every: {
                        AND: [{
                            delivery_date: {
                                gte: date_inicial
                            },
                        },
                        {
                            delivery_date: {
                                lte: date_final
                            }
                        }]
                    }
                },
            },
            orderBy: {
                company: {
                    priority: "asc",
                },


            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
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
                company: true,
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
                // OR: [
                //     {
                //         fk_user: fk_client,
                //         orderBatchItem: null,
                //     },
                //     {
                //         fk_user: fk_client,
                //         orderBatchItem: {
                //             is_removed: true,
                //         },
                //     }
                // ]
                fk_user: fk_client,
                orderBatchItem: {
                    is_removed: false,
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
    async findMany({ numberOrder, skip, take, order_status, orderType, fk_client, fk_company }: ListByAdminOrderDTO, dataInicial: Date, dataFinal: Date): Promise<OrderAdmin[]> {


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
                is_created_by_company: true,
                file_payment_voucher: true,
                invoice_number: true,
                fk_orderstatus: true,
                fk_user: true,
                file_caution: true,
                fk_company: true,
                company: {
                    select: {
                        priority: true,
                        corporate_name: true,
                        cep: true,
                        district: true,
                        cnpj: true,
                        address: true,
                        county: true,
                    }
                },
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
                        comment: true,
                        method_of_preparation: true,
                        delivery_date: true,
                        categoryOrderItem: {
                            select: {
                                id: true,
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
                fk_user: fk_client,
                fk_company: fk_company,
                orderItem: {
                    some: {


                        delivery_date: {
                            gte: dataInicial,
                            lte: dataFinal

                        }





                    }
                },
                order_type: orderType,
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

    async create({ createOrderItemDto, dateOrder, fk_user, fk_orderstatus, valueOrder, order_type, fk_company, is_created_by_company }: CreateOrderAlternativeDto): Promise<void> {

        await this.prisma.order.create({
            data: {
                fk_user,
                fk_orderstatus,
                valueOrder,
                is_created_by_company,
                fk_company,
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
    async findManyByClient({ fk_user, numberOrder, skip, take, order_status, fk_company }: ListByClientOrderDTO): Promise<OrderAlternative[]> {
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
                company: true,
                fk_company: true,
                orderItem: {
                    select: {
                        categoryOrderItem: {
                            select: {
                                id: true,
                                description: true,
                            }
                        },
                        comment: true,
                        fk_revenue: true,
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
                fk_company,
            },
            orderBy: {
                numberOrder: "desc"
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }

}