import { Injectable } from '@nestjs/common';
import { RevenuePerCompanyRepository } from '../contract/RevenuePerCompanyRepository';
import { PrismaService } from 'src/shared/config/database/prisma/prisma.service';
import { FindAllRevenuePerCompany } from '../../dto/find-all-revenue-per-company.dto';
import { FiltersRevenuePerCompanyDTO } from '../../dto/filters-revenue-per-company.dto';
import { RevenuePerCompany } from '../../entities/revenue-per-company.emtity';
import { UpdateRevenuePerCompanyStatusDTO } from '../../dto/update-revenue-per-company-status.dto';
import { CreateRevenuePerCompanyStatusDTO } from '../../dto/create-revenue-per-company.dto';

@Injectable()
export class RevenuePerCompanyRepositoryInPrisma implements RevenuePerCompanyRepository {
    constructor(private prisma: PrismaService) { }

    async findOne(fk_revenue: string, fk_company: string): Promise<RevenuePerCompany> {
        const data = await this.prisma.revenuePerCompany.findUnique({
            where: {
                fk_revenue_fk_company: {
                    fk_company,
                    fk_revenue
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }

    async findAll({ company_corporate_name, description_revenue, skip, take }: FiltersRevenuePerCompanyDTO): Promise<FindAllRevenuePerCompany[]> {
        const data = await this.prisma.revenuePerCompany.findMany({
            select: {
                company: {
                    select: {
                        corporate_name: true,
                    },
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
                company: {
                    corporate_name: {
                        contains: company_corporate_name,
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
    async create({ fk_company, fk_revenue, unique_value }: CreateRevenuePerCompanyStatusDTO): Promise<void> {
        await this.prisma.revenuePerCompany.create({
            data: {
                fk_company,
                fk_revenue,
                unique_value,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async remove(fk_revenue: string, fk_company: string): Promise<void> {
        await this.prisma.revenuePerCompany.delete({
            where: {
                fk_revenue_fk_company: {
                    fk_company,
                    fk_revenue
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

    }
    async patchStatus({ fk_company, fk_revenue, unique_value }: UpdateRevenuePerCompanyStatusDTO): Promise<void> {
        await this.prisma.revenuePerCompany.update({
            data: {
                unique_value,
            },
            where: {
                fk_revenue_fk_company: {
                    fk_company,
                    fk_revenue
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }




}