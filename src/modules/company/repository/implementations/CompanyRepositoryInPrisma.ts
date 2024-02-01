import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { Company } from "../../entities/company.entity";
import { CompanyRepository } from "../contract/CompanyRepository";
import { CreateCompanyDto } from "../../dto/create-company.dto";
import { Injectable } from '@nestjs/common';
import { UpdateCompanyDto } from "../../dto/update-company.dto";

@Injectable()
export class CompanyRepositoryInPrisma implements CompanyRepository {
    constructor(private prisma: PrismaService) { }
    async findAllPriority(): Promise<Company[]> {
        return await this.prisma.company.findMany({
            orderBy: {
                priority: "asc",
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async findPriority(priority: number): Promise<Company> {
        return await this.prisma.company.findFirst({
            where: {
                priority,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async patchPriority(id: string, priority: number): Promise<void> {
        await this.prisma.company.update({
            data: {
                priority
            },
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }


    async findAll(): Promise<Company[]> {
        const data = await this.prisma.company.findMany({
            orderBy: {
                corporate_name: "asc"
            }
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
                county: updateCompanyDto.county,
                district: updateCompanyDto.district,
                uf: updateCompanyDto.uf,
                updateAt: new Date(),

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
                priority: 0,
                cnpj: createCompanyDto.cnpj,
                county: createCompanyDto.county,
                district: createCompanyDto.district,
                uf: createCompanyDto.uf,
                createdAt: new Date(),
            }
        }).catch(async (error) => {
            await this.prisma.$disconnect()
        })
    }


    async findById(id: string): Promise<Company> {
        const data = await this.prisma.company.findUnique({
            include:{
                Client_Company: true,
            },
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async findByCNPJ(cnpj: string): Promise<Company> {
        const data = await this.prisma.company.findFirst({
            where: {
                AND: {
                    cnpj,
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }



}