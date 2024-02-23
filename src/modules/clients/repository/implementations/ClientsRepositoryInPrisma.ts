import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { Client } from "../../entities/client.entity";
import { ClientsRepository } from "../contract/ClientsRepository";
import { Injectable } from "@nestjs/common";
import { CreateClientDto } from "../../dto/create-client.dto";
import { UpdateClientDto } from "../../dto/update-client.dto";
import { PaginationOptions } from "../../dto/pagination-options.dto";


@Injectable()
export class ClientsRepositoryInPrisma implements ClientsRepository {

    constructor(private prisma: PrismaService) { }
    async findByIE(Ie: string): Promise<Client> {
        return await this.prisma.client.findFirst({
            where: {
                ie: Ie,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async findByFone(fone: string): Promise<Client> {
        return await this.prisma.client.findUnique({
            where: {
                fone
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
  
    async remove(id: string): Promise<void> {
        await this.prisma.client.delete({
            where: {
                id
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async create(createClientDto: CreateClientDto): Promise<Client> {
        return await this.prisma.client.create({
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
                    is_driver: createClientDto.createUser.is_driver,
                    is_production:createClientDto.createUser.is_production,
                    createdAt: new Date()

                }
            }

            
           }
        }).finally(() => {
            this.prisma.$disconnect()
        })

    }

    async update(id: string,updateClientDto: UpdateClientDto): Promise<void> {
         await this.prisma.client.update({
            where:{
              id,
            },
           data:{
            name_fantasy: updateClientDto.name_fantasy,
            county: updateClientDto.county,
            district: updateClientDto.district,
            ie: updateClientDto.ie,
            address: updateClientDto.address,
            cep: updateClientDto.cep,
            cnpj: updateClientDto.cnpj,
            accountable: updateClientDto.accountable,
            corporate_name: updateClientDto.corporate_name,
            updateAt: new Date(),
            fone: updateClientDto.fone,
            uf: updateClientDto.uf,
            user:{
                update:{
                    email: updateClientDto.updateUserDto.email,
                    password: updateClientDto.updateUserDto.password,
                    is_client: updateClientDto.updateUserDto.is_client,
                    is_admin: updateClientDto.updateUserDto.is_admin,
                    is_enabled: updateClientDto.updateUserDto.is_enabled,
                    is_driver: updateClientDto.updateUserDto.is_driver,
                    is_production:updateClientDto.updateUserDto.is_production,
                    updateAt: new Date()
                }
            }

            
           }
        }).finally(() => {
            this.prisma.$disconnect()
        })

    }

    async findByCNPJ(cnpj: string): Promise<Client> {
        const data = await this.prisma.client.findFirst({
            where: {
                cnpj
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data;
    }
    async findByAll(pagination?: PaginationOptions): Promise<Client[]> {
        const data = await this.prisma.client.findMany({
            where:{
                corporate_name: {
                    contains: pagination.corporate_name
                }
            },
            orderBy: {
                corporate_name: "asc"
            }
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