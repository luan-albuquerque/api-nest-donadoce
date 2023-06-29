import { Injectable } from "@nestjs/common";
import { IngredientsRepository } from "../contract/IngredientsRepository";
import { CreateIngredientDto } from "../../dto/create-ingredient.dto";
import { PaginationOptions } from "../../dto/pagination-options.dto";
import { UpdateIngredientDto } from "../../dto/update-ingredient.dto";
import { Ingredient } from "../../entities/ingredient.entity";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { skip } from "rxjs";

@Injectable()
export class IngredientsRepositoryInPrisma implements IngredientsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async listFluxoIngredient(control: boolean): Promise<Ingredient[]> {
        const data = await this.prisma.ingredients.findMany({
          include:{
            Ingredient_control: control,
          }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }

    async create(createIngredientDto: CreateIngredientDto): Promise<void> {
        await this.prisma.ingredients.create({
            data: {
                description: createIngredientDto.description,
                value: createIngredientDto.value,
                created_at: new Date()
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async update(id: string, updateIngredientDto: UpdateIngredientDto): Promise<void> {
        await this.prisma.ingredients.update({
            data: {
                description: updateIngredientDto.description,
                value: updateIngredientDto.value,
                amount_actual: updateIngredientDto.amount_actual,
                updated_t: new Date()
            },
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async list(data: PaginationOptions): Promise<Ingredient[]> {
        const result = await this.prisma.ingredients.findMany(
            {
                skip: data.skip,
                take: data.limit,
                orderBy: {
                    created_at: "desc"
                }
            },
        ).finally(() => {
            this.prisma.$disconnect()
        })

        return result
    }
    async findById(id: string): Promise<Ingredient> {
        const result = await this.prisma.ingredients.findUnique(
            {
                where: {
                    id
                }
            }
        ).finally(() => {
            this.prisma.$disconnect()
        })

        return result
    }

    async findByDescription(description: string): Promise<Ingredient> {
        const result = await this.prisma.ingredients.findFirst(
            {
                where: {
                    description
                }
            }
        ).finally(() => {
            this.prisma.$disconnect()
        })

        return result
    }

    async remove(id: string): Promise<void> {
        await this.prisma.ingredients.delete(
            {
                where: {
                    id
                }
            }
        ).finally(() => {
            this.prisma.$disconnect()
        })

    }



}