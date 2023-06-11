import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { Client } from "../../entities/client.entity";
import { ClientsRepository } from "../contract/ClientsRepository";
import { Injectable } from "@nestjs/common";
import { CreateClientDto } from "../../dto/create-client.dto";


@Injectable()
export class ClientsRepositoryInPrisma implements ClientsRepository {

    constructor(private prisma: PrismaService) { }
    async create(createClientDto: CreateClientDto): Promise<void> {
         await this.prisma.clients.create({
           data:{
            email: createClientDto.email,
            address: createClientDto.address,
            cep: createClientDto.cep,
            cnpj: createClientDto.cnpj,
            corporate_name: createClientDto.corporate_name,
            password: createClientDto.password,
            createdAt: new Date(),
            fone: createClientDto.fone,
            is_enabled: true,

           }
        }).finally(() => {
            this.prisma.$disconnect()
        })

    }
    async findByCNPJ(cnpj: string): Promise<Client> {
        const data = await this.prisma.clients.findUnique({
            where: {
                cnpj
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }
    async findByAll(): Promise<Client[]> {
        const data = await this.prisma.clients.findMany({

        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }
    async findByMail(email: string): Promise<Client> {
        const data = await this.prisma.clients.findUnique({
            where: {
                email,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }
    async findById(id: string): Promise<Client> {
        const data = await this.prisma.clients.findUnique({
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }

}