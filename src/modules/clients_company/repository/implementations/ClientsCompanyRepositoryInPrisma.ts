import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { ClientCompany } from "../../entities/clients_company.entity";
import { ClientsCompanyRepository } from "../contract/ClientsCompanyRepository";
import { CreateClientCompany } from "../../dto/create-client-company.dto";
import { Injectable } from '@nestjs/common';
import { UpdateCompanyDto } from "../../dto/update-company.dto";
import { PaginationOptions } from "../../dto/pagination-options.dto";

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
    async findAll(page: PaginationOptions): Promise<ClientCompany[]> {
       return await this.prisma.client_Company.findMany({
          include:{
            clients: true,
            company: true,
          },
          skip: page.skip,
          take: page.limit
        }).finally(()=>{
            this.prisma.$disconnect()
        })
    }

    async findOneByClient(fk_client: string): Promise<ClientCompany[]> {
        return await this.prisma.client_Company.findMany({
          where:{
            fk_client,
          },
          include:{
            company: true,
          }
         }).finally(()=>{
             this.prisma.$disconnect()
         })
     }

    async remove(fk_client: string,fk_company: string): Promise<void> {
         await this.prisma.client_Company.delete({
             where:{
                fk_client_fk_company:{
                    fk_client,
                    fk_company
                }
             }
          }).finally(()=>{
              this.prisma.$disconnect()
          })
    }
   


}