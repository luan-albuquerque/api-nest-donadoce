import { Injectable } from "@nestjs/common";
import { ControlProductionRepository } from "../contract/ControlProductionRepository";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { CreateControlProductionProductDto } from "../../dtos/create-control-production-product.dto";
import { ControlProductionProductEntity } from "../../entity/control-production-product.entity";
import * as dayjs from "dayjs";
import { FindItemProductionDto } from "../../dtos/find-item-production.dto";
import { UpdateControlProductionProductDto } from "../../dtos/update-control-production.dto";
import { OrderType } from "src/modules/order/types/ordertype.type";
import { CreateControlProductionClientDto } from "../../dtos/create-control-production-client.dto";
import { FindItemProductionDtoClient } from "../../dtos/find-item-production-client.dto";
import { UpdateControlProductionClientDto } from "../../dtos/update-control-production-client.dto";
import { ControlProductionClientEntity } from "../../entity/control-production-client.entity";

@Injectable()
export class ControlProductionRepositoryInPrisma implements ControlProductionRepository {

    constructor(
        private readonly prisma: PrismaService
    ) { }
    async findAllControlProductionClient(order_type: OrderType): Promise<ControlProductionClientEntity[]> {
        return await this.prisma.controlProductionClient.findMany({
            where: {
                delivery_date: {
                    gte: dayjs(dayjs().format("YYYY-MM-DDT00:00:00Z")).utc(true).toDate(),
                    lte: dayjs(dayjs().format("YYYY-MM-DDT23:59:59Z")).utc(true).toDate()
                },
                order_type,

            },
            orderBy: {
                seq: "asc"
            }
        }).finally(() => {
            this.prisma.$disconnect();
        })
    }
    async updateSequencialClient(id: string, seq: number): Promise<void> {
        await this.prisma.controlProductionClient.update({
            data: {
                seq,
            },
            where: {
                id
            }
        }).finally(() => {
            this.prisma.$disconnect();
        })
    }
    async updateItemProductionClient({ amount_actual, id }: UpdateControlProductionClientDto): Promise<void> {
        await this.prisma.controlProductionClient.update({
            data: {
                amount_actual,
            },
            where: {
                id
            }
        }).finally(() => {
            this.prisma.$disconnect();
        })
    }
    async findItemProductionClient({ fk_ordertype, fk_revenue, fk_user, delivery_date }: FindItemProductionDtoClient): Promise<ControlProductionClientEntity> {
    
    
        return await this.prisma.controlProductionClient.findFirst({
            where: {
                fk_revenue,
                order_type: fk_ordertype,
                fk_user,
                delivery_date,
            },
        }).finally(() => {
            this.prisma.$disconnect();
        });
    }
    async createItemProductionTypeClient(
        { amount_actual, corporate_name, delivery_date, description,
            description_category, fk_categoryOrderItem, fk_revenue, fk_user, order_type, seq, company_name, fk_company
        }: CreateControlProductionClientDto): Promise<void> {
        await this.prisma.controlProductionClient.create({
            data: {
                seq,
                amount_actual,
                delivery_date,
                description,
                description_category,
                fk_categoryOrderItem,
                fk_revenue,
                order_type,
                corporate_name,
                fk_user,
                company_name,
                fk_company,

            }
        }).finally(() => {
            this.prisma.$disconnect();
        })
    }
    async updateSequencialProduct(id: string, seq: number): Promise<void> {
        await this.prisma.controlProductionProduct.update({
            data: {
                seq,
            },
            where: {
                id
            }
        }).finally(() => {
            this.prisma.$disconnect();
        })
    }
    async findAllControlProductionProduct(order_type: OrderType): Promise<ControlProductionProductEntity[]> {

      
          
        return await this.prisma.controlProductionProduct.findMany({
            where: {
                AND: {
                    delivery_date: {
                        gte: dayjs(dayjs().format("YYYY-MM-DDT00:00:00Z")).utc(true).toDate(),
                        lte: dayjs(dayjs().format("YYYY-MM-DDT23:59:59Z")).utc(true).toDate()
                    }
                },
                order_type,

            },
            orderBy: {
                seq: "asc"
            }
        }).finally(() => {
            this.prisma.$disconnect();
        })
    }
    async updateItemProduction({ amount_actual, id }: UpdateControlProductionProductDto): Promise<void> {
        await this.prisma.controlProductionProduct.update({
            data: {
                amount_actual,
            },
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect();
        })
    }
    async createItemProductionTypeProduct({ amount_actual, delivery_date, description, description_category, fk_categoryOrderItem, fk_revenue, order_type, seq }: CreateControlProductionProductDto): Promise<void> {
        await this.prisma.controlProductionProduct.create({
            data: {
                seq,
                amount_actual,
                delivery_date,
                description,
                description_category,
                fk_categoryOrderItem,
                fk_revenue,
                order_type
            }
        }).finally(() => {
            this.prisma.$disconnect();
        })
    }




    async findItemProduction({ fk_revenue, delivery_date, order_type }: FindItemProductionDto): Promise<ControlProductionProductEntity> {
     
        return await this.prisma.controlProductionProduct.findFirst({
            where: {
                fk_revenue,
                order_type,
                delivery_date,
            }
        }).finally(() => {
            this.prisma.$disconnect();
        })
    }

    async findSeqControlProductProductInDay(delivery_date: Date): Promise<number> {

        const data = await this.prisma.controlProductionProduct.findFirst({
            orderBy: {
                seq: "desc"
            },
            where: {
                delivery_date
            }
        }).finally(() => {
            this.prisma.$disconnect();
        })


        const r = data != null ? data.seq : 0
        return r;
    }


}