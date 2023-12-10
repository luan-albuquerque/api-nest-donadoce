import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { CreateRevenueDto } from "../../dto/create-revenue.dto";
import { UpdateRevenueDto } from "../../dto/update-revenue.dto";
import { RevenuesRepository } from "../contract/RevenuesRepository";
import { Revenue } from "../../entities/revenue.entity";
import { Injectable } from "@nestjs/common";
import { FindAllRevenueSummarized } from "../../dto/find-all-revenue-summarized.entity";
import { FiltersRevenueDTO } from "../../dto/filters-revenue.dto";


@Injectable()
export class RevenuesRepositoryInPrisma implements RevenuesRepository {

    constructor(private prisma: PrismaService) { }
    async findByAllNotMenu(fk_menu: string): Promise<Revenue[]> {
        const data = await this.prisma.revenues.findMany(
            {
                where:{
                    is_enabled: true,
                    ItemMenu:{
                        every:{
                            NOT:{
                                fk_menu,
                            }
                        }
                    }
                }
            }
        ).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async findByOneWithIngreditens(id: string): Promise<Revenue> {
        const data = await this.prisma.revenues.findUnique({
            include:{
                ingredients_Revenues: true,
            },
            where: {
                id,
            },
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    
    async findByAllNotFilter(): Promise<Revenue[]> {
        const data = await this.prisma.revenues.findMany().finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async findByAllSummarized({ description, skip, take }: FiltersRevenueDTO): Promise<FindAllRevenueSummarized[]> {
        const data = await this.prisma.revenues.findMany({
            select: {
                id: true,
                description: true,
                imagem: true,
                value: true,
                presumed_profit: true,
                yield_per_quantity: true,

            },
            where: {
                is_enabled: true,
                description:{
                    contains: description,
                    mode: "insensitive"
                }
            },
            take,
            skip,
            orderBy: {
                created_at: "asc"
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }

    async putStatus(id: string): Promise<void> {
        await this.prisma.revenues.update({
            data: {
                is_enabled: false
            },
            where: {
                id,
            },
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }

    async create(createRevenueDto: CreateRevenueDto): Promise<Revenue> {
        const data = await this.prisma.revenues.create({
            data: {
                time_in_hours: createRevenueDto.time_in_hours,
                description: createRevenueDto.description,
                imagem: createRevenueDto.imagem,
                presumed_profit: createRevenueDto.presumed_profit,
                value: createRevenueDto.value,
                yield_per_quantity: createRevenueDto.yield_per_quantity,
                value_defined_by_revenue: createRevenueDto.value_defined_by_revenue,
                status: createRevenueDto.status,
                order_type: createRevenueDto.order_type,
                base_max_amount: createRevenueDto.base_max_amount,
                base_min_amount: createRevenueDto.base_min_amount,
                created_at: new Date(),
                
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async remove(id: string): Promise<void> {
        await this.prisma.revenues.delete({
            where: {
                id,
            },
            include: {
                ingredients_Revenues: {
                    where: {
                        fk_revenues: id
                    }
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async findByOne(id: string): Promise<Revenue> {
        const data = await this.prisma.revenues.findUnique({
            where: {
                id,
            },
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async findByDescription(description: string): Promise<Revenue> {

        const data = await this.prisma.revenues.findFirst({
            where: {
                description,
                is_enabled: true,
            },
        }).finally(() => {
            this.prisma.$disconnect()
        })
        return data
    }

    async findByAll({ description, skip, take }: FiltersRevenueDTO): Promise<Revenue[]> {
        const data = await this.prisma.revenues.findMany({
            where: {
                is_enabled: true,
                description:{
                    contains: description,
                    mode: "insensitive"
                }
            },
            take,
            skip,
            orderBy: {
                created_at: "asc"
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async findByOneWithIngredients(id: string): Promise<Revenue> {
        const data = await this.prisma.revenues.findUnique({
            where: {
                id
            },
            include: {
                ingredients_Revenues: {
                    include: {
                        ingredients: true,
                    }
                },
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async update(id: string, updateRevenueDto: UpdateRevenueDto): Promise<void> {
        await this.prisma.revenues.update({
            where: {
                id
            },
            data: {
                description: updateRevenueDto.description,
                imagem: updateRevenueDto.imagem,
                presumed_profit: updateRevenueDto.presumed_profit,
                value: updateRevenueDto.value,
                base_max_amount: updateRevenueDto.base_max_amount,
                base_min_amount: updateRevenueDto.base_min_amount,
                order_type: updateRevenueDto.order_type,
                time_in_hours: updateRevenueDto.time_in_hours,
                value_defined_by_revenue: updateRevenueDto.value_defined_by_revenue,
                yield_per_quantity: updateRevenueDto.yield_per_quantity,
                updated_t: new Date(),
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }


}