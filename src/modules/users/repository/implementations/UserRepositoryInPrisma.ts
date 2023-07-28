import { User } from 'src/modules/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/config/database/prisma/prisma.service';
import { UserRepository } from '../contract/UserRepository';

@Injectable()
export class UserRepositoryInPrisma implements UserRepository {
    constructor(private prisma: PrismaService) { }
    async finInforUser(id: string): Promise<User> {
        const data = await this.prisma.user.findUnique({
            include:{
              Clients: true,
              Person: true,
            },
            where: {
                id
            },

        })
        return data;
    }
    async remove(id: string): Promise<void> {
        await this.prisma.user.delete({
            where:{
                
            }
        }).finally(async () => {
            await this.prisma.$disconnect()
        })
    }
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




}
