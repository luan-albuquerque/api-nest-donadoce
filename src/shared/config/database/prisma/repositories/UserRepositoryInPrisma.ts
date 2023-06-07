import { User } from 'src/modules/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/users/repository/UserRepository';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { PaginationOptions } from 'src/modules/users/dto/pagination-options.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';

@Injectable()
export class UserRepositoryInPrisma implements UserRepository {
    constructor(private prisma: PrismaService) { }
    async updatePassword(id: string, password: string): Promise<void> {
        await this.prisma.user.update({
            where:{
                id: id,
            },
            data: {
              password,
            }
        }).finally(async () => {
            await this.prisma.$disconnect()
        })
    }
   async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
        await this.prisma.user.update({
            where:{
                id: id,
            },
            data: {
                // cpf: updateUserDto.cpf,
                email: updateUserDto.email,
                fone: updateUserDto.fone,
                name: updateUserDto.name,
                // username: updateUserDto.username,
                // password: updateUserDto.password,
                updateAt: new Date(),
                is_enabled: updateUserDto.is_enabled,
                is_product: updateUserDto.is_product,
                is_revenues: updateUserDto.is_revenues,
                is_stock: updateUserDto.is_stock,
            }
        }).finally(async () => {
            await this.prisma.$disconnect()
        })
    }
    // async findByUsername(username: string): Promise<User> {
    //     const data = await this.prisma.user.findUnique({
    //      where:{
    //         username
    //      }
    //     }).finally(async () => {
    //         await this.prisma.$disconnect()
    //     })

    //     return data
    // }
    async create(createUserDto: CreateUserDto): Promise<void> {
        await this.prisma.user.create({
            data: {
                // cpf: createUserDto.cpf,
                email: createUserDto.email,
                fone: createUserDto.fone,
                name: createUserDto.name,
                // username: createUserDto.username,
                password: createUserDto.password,
                is_admin: createUserDto.is_admin,
                createdAt: new Date(),
                is_enabled: true,
                is_product: createUserDto.is_product,
                is_revenues: createUserDto.is_revenues,
                is_stock: createUserDto.is_stock,
            }
        }).finally(async () => {
            await this.prisma.$disconnect()
        })

    }
    async list({ limit, skip }: PaginationOptions): Promise<User[]> {
        const data = await this.prisma.user.findMany({
            skip,
            take: limit,
            select: {
                id: true,
                name: true,
                // username: true,
                email: true,
                // cpf:true,
                fone: true,
                is_admin: true,
                is_enabled: true,
                is_product: true,
                is_revenues: true,
                is_stock: true,
                updateAt: true,
                createdAt: true,
            }
        }).finally(async () => {
            await this.prisma.$disconnect()
        })

        return data
    }
    async findByMail(email: string): Promise<User> {
        const data = await this.prisma.user.findFirst({
            where: {
                email
            },
        })

        return data
    }
    async findById(id: string): Promise<User> {
        const data = await this.prisma.user.findFirst({
            where: {
                id
            },

        })

        return data
    }
    // async findByCpf(cpf: string): Promise<User> {
    //     const data = await this.prisma.user.findFirst({
    //         where: {
    //             cpf
    //         }
    //     }).finally(async () => {
    //         await this.prisma.$disconnect()
    //     })


    //     return data
    // }
    findByNickName(register: string): Promise<User> {
        throw new Error('Method not implemented.');
    }



}
