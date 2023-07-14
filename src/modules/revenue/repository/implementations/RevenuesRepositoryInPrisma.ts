import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { CreateRevenueDto } from "../../dto/create-revenue.dto";
import { UpdateRevenueDto } from "../../dto/update-revenue.dto";
import { RevenuesRepository } from "../contract/RevenuesRepository";
import { Revenue } from "../../entities/revenue.entity";
import { Injectable } from "@nestjs/common";


@Injectable()
export class RevenuesRepositoryInPrisma implements RevenuesRepository {

    constructor(private prisma: PrismaService) { }
    
    async putStatus(id:string): Promise<void> {
        await this.prisma.revenues.update({
            data:{
                is_enabled: false
            },
            where:{
             id,
            },
         }).finally(() => {
             this.prisma.$disconnect()
         })
    }

    async create(createRevenueDto: CreateRevenueDto): Promise<Revenue> {
        const data = await this.prisma.revenues.create({
            data: {
              time_in_hours: createRevenueDto.time_in_hours,
              description: createRevenueDto.description,
              imagem: createRevenueDto.imagem,
              presumed_profit: createRevenueDto.presumed_profit,
              value: createRevenueDto.value,
              yield_per_quantity: createRevenueDto.yield_per_quantity,
              status: createRevenueDto.status,
              created_at: new Date(),
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async remove(id: string): Promise<void> {
       await this.prisma.revenues.delete({
           where:{
            id,
           },
           include:{
            ingredients_Revenues:{
                where:{
                    fk_revenues: id
                }
            }
           }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async findByOne(id: string): Promise<Revenue> {
        const data = await this.prisma.revenues.findUnique({
            where:{
             id,
            },
         }).finally(() => {
             this.prisma.$disconnect()
         })

         return data
    }
    async findByDescription(description: string): Promise<Revenue> {
  
        const data = await this.prisma.revenues.findFirst({
            where:{
                description,
            },
         }).finally(() => {
             this.prisma.$disconnect()
         })
         return data
    }
    
    async findByAll(): Promise<Revenue[]> {
        const data = await this.prisma.revenues.findMany({
            where:{
                is_enabled: true,
            }
         }).finally(() => {
             this.prisma.$disconnect()
         })

         return data
    }
    async findByOneWithIngredients(id: string): Promise<Revenue> {
        const data = await this.prisma.revenues.findUnique({
            where:{
                id
            }, 
            include:{
                ingredients_Revenues: {
                    include:{
                        ingredients: true,
                    }
                },
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }
    async update(id: string, updateRevenueDto: UpdateRevenueDto): Promise<void> {
        await this.prisma.revenues.update({
            where:{
                id
            }, 
            data:{
                description: updateRevenueDto.description,
                imagem: updateRevenueDto.imagem,
                presumed_profit: updateRevenueDto.presumed_profit,
                value: updateRevenueDto.value,
                time_in_hours:updateRevenueDto.time_in_hours,
                yield_per_quantity: updateRevenueDto.yield_per_quantity,
                updated_t: new Date(),
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }


}