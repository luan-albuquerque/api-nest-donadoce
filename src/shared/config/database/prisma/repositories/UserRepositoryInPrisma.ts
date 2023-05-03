import { User } from 'src/modules/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/users/repository/UserRepository';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class UserRepositoryInPrisma implements UserRepository {
  constructor(private prisma: PrismaService) {}
    async create(createUserDto: CreateUserDto): Promise<void> {
        await this.prisma.user.create({
            data:{
                cpf: createUserDto.cpf,
                email: createUserDto.email,
                fone: createUserDto.fone,
                name: createUserDto.name,
                username: createUserDto.username,
                password: createUserDto.password,
                createdAt: new Date(),
                is_enabled: true,
                is_product: createUserDto.is_product,
                is_revenues: createUserDto.is_revenues,
                is_stock: createUserDto.is_stock,
            }
        })
    }
    list(): Promise<User[]> {
        throw new Error('Method not implemented.');
    }
    async findByMail(email: string): Promise<User> {
       const data = await this.prisma.user.findFirst({
           where:{
            email
           }
        })

        return data
    }
    findById(register: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
    async findByCpf(cpf: string): Promise<User> {
        const data = await this.prisma.user.findFirst({
            where:{
             cpf
            }
         })
 
         return data
    }
    findByNickName(register: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
    
  
   
}
