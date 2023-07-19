import { Injectable } from '@nestjs/common';
import { RevenuePerClientRepository } from '../contract/RevenuePerClientRepository';
import { PrismaService } from 'src/shared/config/database/prisma/prisma.service';
import { RevenuePerClient } from '../../entities/revenue-per-client.emtity';
import { CreateRevenuePerClientStatusDTO } from '../../dto/create-revenue-per-client.dto';
import { FiltersRevenuePerClientDTO } from '../../dto/filters-revenue-per-client.dto';
import { UpdateRevenuePerClientStatusDTO } from '../../dto/update-revenue-per-client-status.dto';
import { FindAllRevenuePerClient } from '../../dto/find-all-revenue-per-client.dto';

@Injectable()
export class RevenuePerClientRepositoryInPrisma implements RevenuePerClientRepository {
    constructor(private prisma: PrismaService) { }

    async findOne(fk_revenue: string, fk_client: string): Promise<RevenuePerClient> {
        const data = await this.prisma.revenuePerClient.findUnique({
            where: {
                fk_revenue_fk_client: {
                    fk_client,
                    fk_revenue
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }

    async findAll({ client_corporate_name, description_revenue, skip, take }: FiltersRevenuePerClientDTO): Promise<FindAllRevenuePerClient[]> {
        const data = await this.prisma.revenuePerClient.findMany({
            select: {
                client: {
                    select: {
                        corporate_name: true,
                    }
                },
                revenues: {
                    select: {
                        description: true,
                        value: true,
                    },
                },
                unique_value: true,
            },
            where: {
                client: {
                    corporate_name: {
                        contains: client_corporate_name,
                        mode: "insensitive"
                    }
                },
                revenues: {
                    description: {
                        contains: description_revenue,
                        mode: "insensitive"

                    }
                }
            },
            take,
            skip,
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async create({ fk_client, fk_revenue, unique_value }: CreateRevenuePerClientStatusDTO): Promise<void> {
        await this.prisma.revenuePerClient.create({
            data: {
                fk_client,
                fk_revenue,
                unique_value,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async remove(fk_revenue: string, fk_client: string): Promise<void> {
        await this.prisma.revenuePerClient.delete({
            where: {
                fk_revenue_fk_client: {
                    fk_client,
                    fk_revenue
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

    }
    async patchStatus({ fk_client, fk_revenue, unique_value }: UpdateRevenuePerClientStatusDTO): Promise<void> {
        await this.prisma.revenuePerClient.update({
            data: {
                unique_value,
            },
            where: {
                fk_revenue_fk_client: {
                    fk_client,
                    fk_revenue
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }




}