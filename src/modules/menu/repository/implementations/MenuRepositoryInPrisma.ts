import { Injectable } from "@nestjs/common";
import { MenuRepository } from "../contract/MenuRepository";
import { CreateMenuDto } from "../../dto/create-menu.dto";
import { Menu } from "../../entities/menu.entity";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { FiltersMenuDTO } from "../../dto/filters-menu.dto";
import * as dayjs from "dayjs";


@Injectable()
export class MenuRepositoryInPrisma implements MenuRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async create(createMenuDto: CreateMenuDto): Promise<Menu> {
        return await this.prisma.menu.create({
            data: {
                dateMenu: new Date(createMenuDto.dateMenu),
                itemMenu: {
                    createMany: {
                        data: createMenuDto.createItensMenu
                    }
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }

    async findAll({ dateMenu, skip, take, itensMenu }: FiltersMenuDTO): Promise<Menu[]> {

        itensMenu = String(itensMenu) == 'false' ? false : true;

        return await this.prisma.menu.findMany({

            select: {
                id: true,
                dateMenu: true,
                itemMenu: {
                    include: {
                        revenues: itensMenu,
                    }
                },
            },

            where: {
                is_enabled: true,
                dateMenu: dateMenu ? new Date(dateMenu) : undefined,
            },
            orderBy: {
                dateMenu: "desc"
            },
            skip,
            take
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }


    async findAllToClient({ dateMenu, skip, take, itensMenu }: FiltersMenuDTO): Promise<Menu[]> {

        itensMenu = String(itensMenu) == 'false' ? false : true;

        return await this.prisma.menu.findMany({

            select: {
                id: true,
                dateMenu: true,
                itemMenu: {
                    include: {
                        revenues: itensMenu,
                    }
                },
            },

            where: {
                is_enabled: true,
                dateMenu: {
                    gte: dayjs(dayjs().format("YYYY-MM-DDT00:00:00Z")).add(1, 'day').utc(true).toDate(),
                },
            },
            orderBy: {
                dateMenu: "asc"
            },
            skip,
            take
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }

    async findOne(id: string): Promise<Menu> {
        return await this.prisma.menu.findUnique({
            include: {
                itemMenu: {
                    include: {
                        revenues: true,
                    }
                },
            },
            where: {
                id
            },
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }

    async updateStatus(id: string): Promise<void> {
        await this.prisma.menu.update({
            data: {
                is_enabled: false,
            },
            where: {
                id
            },
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }


}