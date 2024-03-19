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
    async createOne(accountable:string, fone: string, fk_client: string, fk_company: string, fk_user: string): Promise<void> {
        await this.prisma.client_Company.create({
            data: {
                accountable: accountable,
                fone: fone,
                fk_client: fk_client,
                fk_company: fk_company,
                fk_user,
                
            },
        }).finally(async ()=>{
            await this.prisma.$disconnect()
        })
    }
  
    async removeAll(fk_client: string): Promise<void> {
        await this.prisma.client_Company.deleteMany({
            where:{
                 fk_client
            }
         }).finally(()=>{
             this.prisma.$disconnect()
         })
    }
    async create(createClientCompany: CreateClientCompany[]): Promise<void> {
       await this.prisma.client_Company.createMany({
            data: createClientCompany ,
            skipDuplicates: true,
        }).finally(async ()=>{
            await this.prisma.$disconnect()
        })
    }
    async findAll(page: PaginationOptions): Promise<ClientCompany[]> {
       return await this.prisma.client_Company.findMany({
          include:{
            clients: true,
            company: true,
          },
          orderBy: {
            company: {
                corporate_name: "asc"
            }
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
          },
          orderBy: {
            company: {
                corporate_name: "asc"
            }
         },
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