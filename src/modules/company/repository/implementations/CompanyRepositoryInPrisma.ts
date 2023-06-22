import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { Company } from "../../entities/company.entity";
import { CompanyRepository } from "../contract/CompanyRepository";
import { CreateCompanyDto } from "../../dto/create-company.dto";
import { Injectable } from '@nestjs/common';
import { UpdateCompanyDto } from "../../dto/update-company.dto";

@Injectable()
export class CompanyRepositoryInPrisma implements CompanyRepository {
    constructor(private prisma: PrismaService) { }
    async findAll(): Promise<Company[]> {
        const data = await this.prisma.company.findMany({

        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<void> {
        await this.prisma.company.update({
            where: {
                id
            },
            data: {
                corporate_name: updateCompanyDto.corporate_name,
                address: updateCompanyDto.address,
                cep: updateCompanyDto.cep,
                cnpj: updateCompanyDto.cnpj,
                fone: updateCompanyDto.fone,
                email: updateCompanyDto.email,
                is_enabled: updateCompanyDto.is_enabled,
                updateAt: new Date()
            },
        }).catch(async (error) => {
            await this.prisma.$disconnect()
        })
    }
    async remove(id: string): Promise<void> {
        await this.prisma.company.delete({
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }

    async create(createCompanyDto: CreateCompanyDto): Promise<void> {
        await this.prisma.company.create({
            data: {
                corporate_name: createCompanyDto.corporate_name,
                address: createCompanyDto.address,
                cep: createCompanyDto.cep,
                cnpj: createCompanyDto.cnpj,
                fone: createCompanyDto.fone,
                email: createCompanyDto.email,
                uf: 
                is_enabled: true,
                createdAt: new Date()
            }
        }).catch(async (error) => {
            await this.prisma.$disconnect()
        })
    }
    async findById(id: string): Promise<Company> {
        const data = await this.prisma.company.findUnique({
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async findByCNPJByClient(cnpj: string, fk_clients: string): Promise<Company> {
        const data = await this.prisma.company.findFirst({
            where: {
                AND: {
                    cnpj,
                    fk_clients,
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async findByEmailByClient(email: string, fk_clients: string): Promise<Company> {
        const data = await this.prisma.company.findFirst({
            where: {
                AND: {
                    email,
                    fk_clients,
                }

            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }


}