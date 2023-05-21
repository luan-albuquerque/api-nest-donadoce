import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { CreateRevenueIngredientDto } from "../../dto/create-revenue_ingredient.dto";
import { UpdateRevenueIngredientDto } from "../../dto/update-revenue_ingredient.dto";
import { RevenuesIngredientsRepository } from "../contract/RevenuesIngredientsRepository";
import { Injectable } from "@nestjs/common";
import { RevenueIngredient } from "../../entities/revenue_ingredient.entity";


@Injectable()
export class RevenuesIngredientsRepositoryInPrisma implements RevenuesIngredientsRepository {

    constructor(private prisma: PrismaService) { }


    async findOneIngredient(fk_ingredient: string): Promise<RevenueIngredient> {
       const data = await this.prisma.ingredients_Revenues.findFirst({
            where:{
             fk_ingredient,
            }
         }).finally(() => {
             this.prisma.$disconnect()
         })

         return data
    }

    async create(createRevenueIngredientDto: CreateRevenueIngredientDto[]): Promise<void> {
        await this.prisma.ingredients_Revenues.createMany({
            data: createRevenueIngredientDto
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async remove(fk_ingredient: string, fk_revenues: string): Promise<void> {
        await this.prisma.ingredients_Revenues.delete({
           where:{
            fk_ingredient_fk_revenues: {
                fk_ingredient,
                fk_revenues,
            }
           }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async update(updateRevenueIngredientDto: UpdateRevenueIngredientDto): Promise<void> {
        await this.prisma.ingredients_Revenues.update({
            data: {
                amount_ingredient: updateRevenueIngredientDto.amount_ingredient,
                
            }, where: {
                fk_ingredient_fk_revenues: {
                    fk_ingredient: updateRevenueIngredientDto.fk_ingredient,
                    fk_revenues: updateRevenueIngredientDto.fk_revenues,
                }
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }

}