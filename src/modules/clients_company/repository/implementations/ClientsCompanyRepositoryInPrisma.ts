import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { ClientCompany } from "../../entities/clients_company.entity";
import { ClientsCompanyRepository } from "../contract/ClientsCompanyRepository";
import { CreateClientCompany } from "../../dto/create-client-company.dto";
import { Injectable } from '@nestjs/common';
import { UpdateCompanyDto } from "../../dto/update-company.dto";

@Injectable()
export class ClientsCompanyRepositoryInPrisma implements ClientsCompanyRepository {
    constructor(private prisma: PrismaService) { }
    async create(createClientCompany: CreateClientCompany[]): Promise<void> {
       await this.prisma.client_Company.createMany({
            data: createClientCompany
        }).finally(()=>{
            this.prisma.$disconnect()
        })
    }
    async findAll(): Promise<ClientCompany[]> {
       return await this.prisma.client_Company.findMany({
          include:{
            clients: true,
            company: true,
          }
        }).finally(()=>{
            this.prisma.$disconnect()
        })
    }
    remove(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
   


}