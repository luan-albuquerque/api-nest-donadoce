import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { Client } from "../../entities/client.entity";
import { ClientsRepository } from "../contract/ClientsRepository";
import { Injectable } from "@nestjs/common";
import { CreateClientDto } from "../../dto/create-client.dto";


@Injectable()
export class ClientsRepositoryInPrisma implements ClientsRepository {

    constructor(private prisma: PrismaService) { }
    async create(createClientDto: CreateClientDto): Promise<void> {
         await this.prisma.client.create({
           data:{
            name_fantasy: createClientDto.name_fantasy,
            county: createClientDto.county,
            district: createClientDto.district,
            ie: createClientDto.ie,
            address: createClientDto.address,
            cep: createClientDto.cep,
            cnpj: createClientDto.cnpj,
            accountable: createClientDto.accountable,
            corporate_name: createClientDto.corporate_name,
            createdAt: new Date(),
            fone: createClientDto.fone,
            uf: createClientDto.uf,
            user:{
                create:{
                    email: createClientDto.createUser.email,
                    password: createClientDto.createUser.password,
                    is_client: createClientDto.createUser.is_client,
                    is_admin: createClientDto.createUser.is_admin,
                    is_enabled: createClientDto.createUser.is_enabled,
                }
            }

            
           }
        }).finally(() => {
            this.prisma.$disconnect()
        })

    }
    async findByCNPJ(cnpj: string): Promise<Client> {
        const data = await this.prisma.client.findUnique({
            where: {
                cnpj
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }
    async findByAll(): Promise<Client[]> {
        const data = await this.prisma.client.findMany({

        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;

    }

    async findById(id: string): Promise<Client> {
        const data = await this.prisma.client.findUnique({
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
        return null

    }

}