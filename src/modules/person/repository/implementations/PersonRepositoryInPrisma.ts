
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/config/database/prisma/prisma.service';
import { PersonRepository } from '../contract/PersonRepository';
import { CreatePersonDto } from '../../dto/create-person.dto';
import { PaginationOptions } from '../../dto/pagination-options.dto';
import { Person } from '../../entities/person.entity';
import { UpdatePersonDto } from '../../dto/update-person.dto';

@Injectable()
export class PersonRepositoryInPrisma implements PersonRepository {
    constructor(private prisma: PrismaService) { }
    async update(id: string, updatePersonDto: UpdatePersonDto): Promise<void> {
        await this.prisma.person.update({
            where: {
                id,
            },
            data: {
                address: updatePersonDto.address,
                cep: updatePersonDto.cep,
                name: updatePersonDto.name,
                fone: updatePersonDto.fone,
                user: {
                    update: {
                        email: updatePersonDto.updateUserDto.email,
                        is_enabled: updatePersonDto.updateUserDto.is_enabled,
                        is_admin: updatePersonDto.updateUserDto.is_admin,
                        updateAt: new Date()
                    }

                }
            }
        }).finally(async () => {
            await this.prisma.$disconnect()
        })
    }
    async findOneById(id: string): Promise<Person> {
        return await this.prisma.person.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            }
        }).finally(async () => {
            await this.prisma.$disconnect()
        })
    }
    async list({ limit, skip }: PaginationOptions): Promise<Person[]> {
        return await this.prisma.person.findMany({
            skip,
            take: limit,
            include:{
                user:{
                    select:{
                        id: true,
                        email: true,
                        is_admin: true,
                        is_client: true,
                        is_enabled: true,
                    }
                }
            }
        }).finally(async () => {
            await this.prisma.$disconnect()
        })

    }

    async create(createPersonDto: CreatePersonDto): Promise<void> {
        await this.prisma.person.create({
            data: {
                address: createPersonDto.address,
                cep: createPersonDto.cep,
                name: createPersonDto.name,
                fone: createPersonDto.fone,
                user: {
                    create: {
                        email: createPersonDto.createUser.email,
                        password: createPersonDto.createUser.password,
                        is_enabled: true,
                        is_admin: false,
                        createdAt: new Date()
                    }

                }
            }
        }).finally(async () => {
            await this.prisma.$disconnect()
        })

    }

}
