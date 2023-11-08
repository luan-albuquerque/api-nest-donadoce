import { Injectable } from '@nestjs/common';
import { RevenuePerClientRepository } from '../contract/RevenuePerClientRepository';
import { PrismaService } from 'src/shared/config/database/prisma/prisma.service';
import { RevenuePerClient } from '../../entities/revenue-per-client.emtity';
import { CreateRevenuePerClientStatusDTO } from '../../dto/create-revenue-per-client.dto';
import { FiltersRevenuePerClientDTO } from '../../dto/filters-revenue-per-client.dto';
import { UpdateRevenuePerClientStatusDTO } from '../../dto/update-revenue-per-client-status.dto';
import { FindAllRevenuePerClient } from '../../dto/find-all-revenue-per-client.dto';
import { ListCrossJoinRevenueByClient } from '../../dto/list-cross-join-revenue-by-client.dto';

@Injectable()
export class RevenuePerClientRepositoryInPrisma implements RevenuePerClientRepository {
    constructor(private prisma: PrismaService) { }
    async findAllNoFilterCompany(fk_company: string): Promise<RevenuePerClient[]> {
        const data = await this.prisma.revenuePerClient.findMany({
            select: {
                fk_client: true,
                client: {
                    include: {
                        Client_Company: true,
                    }
                },
                fk_revenue: true,
                unique_value: true,
            },
            where: {
                client: {
                    AND: {
                        Client_Company: {
                            some: {
                                fk_company,
                            }
                        }
                    }
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }
    async findRevenuesByClient(fk_client: string, skip: number, take: number): Promise<ListCrossJoinRevenueByClient[]> {

        const data: ListCrossJoinRevenueByClient[] = await this.prisma.$queryRaw`
       select c.id as "fk_client",c.corporate_name,r.id as "fk_revenue", r.status  as "revenue_status",r.description,r.value as "revenue_value",rpc.unique_value,(case when rpc.unique_value > 0 then  rpc.unique_value else r.value  end) AS "sale_value" from "Client" c 
       cross join "Revenues" r 
       left join "RevenuePerClient" rpc on c.id = rpc.fk_client and r.id = rpc.fk_revenue
       where c.id  = ${fk_client}
       order  by r.description asc offset ${skip} limit ${take};`

        return data

    }
    async findAllByUser(fk_client: string): Promise<RevenuePerClient[]> {
        const data = await this.prisma.revenuePerClient.findMany({
            where: {
                fk_client,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async findAllNoFilter(): Promise<RevenuePerClient[]> {
        const data = await this.prisma.revenuePerClient.findMany({
            select: {
                fk_client: true,
                client: {
                    include: {
                        Client_Company: true,
                    }
                },
                fk_revenue: true,
                unique_value: true,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }

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
        await this.prisma.revenuePerClient.upsert({
            where: {
                fk_revenue_fk_client: {
                    fk_client,
                    fk_revenue,
                }
            },
            update: {
                fk_client,
                fk_revenue,
                unique_value,
            },
            create: {
                fk_client,
                fk_revenue,
                unique_value,
            },

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