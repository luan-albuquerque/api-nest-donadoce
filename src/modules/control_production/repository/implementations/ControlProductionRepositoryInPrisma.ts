import { Injectable } from "@nestjs/common";
import { ControlProductionRepository } from "../contract/ControlProductionRepository";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { CreateControlProductionDto } from "../../dtos/create-control-production.dto";
import { ControlProductionProductEntity } from "../../entity/control-production-product.entity";
import * as dayjs from "dayjs";
import { FindItemProductionDto } from "../../dtos/find-item-production.dto";
import { UpdateControlProductionProductDto } from "../../dtos/update-control-production.dto";

@Injectable()
export class ControlProductionRepositoryInPrisma implements ControlProductionRepository {

    constructor(
        private readonly prisma: PrismaService
    ) { }
    async findAllControlProductionProduct(delivery_date: Date): Promise<ControlProductionProductEntity[]> {
        return await this.prisma.controlProductionProduct.findMany({
            where: {
                delivery_date,
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
    async createItemProduction({ amount_actual, delivery_date, description, description_category, fk_categoryOrderItem, fk_revenue, order_type, seq }: CreateControlProductionDto): Promise<void> {
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


    async findItemProduction({ fk_categoryOrderItem, fk_revenue, delivery_date }: FindItemProductionDto): Promise<ControlProductionProductEntity> {
        return await this.prisma.controlProductionProduct.findFirst({
            where: {
                fk_revenue,
                fk_categoryOrderItem,
                delivery_date,
            }
        }).finally(() => {
            this.prisma.$disconnect();
        })
    }

    async findSeqControlProductProductInDay(delivery_date: Date): Promise<number> {
        const data = await this.prisma.controlProductionProduct.groupBy({
            by: ['delivery_date'],
            _max: {
                seq: true,
            },
            where: {
                delivery_date,
            }
        }).finally(() => {
            this.prisma.$disconnect();
        })

        return data['_max'];
    }


}