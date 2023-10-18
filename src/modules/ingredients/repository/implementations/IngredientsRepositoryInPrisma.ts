import { Injectable } from "@nestjs/common";
import { IngredientsRepository } from "../contract/IngredientsRepository";
import { CreateIngredientDto } from "../../dto/create-ingredient.dto";
import { PaginationOptions } from "../../dto/pagination-options.dto";
import { UpdateIngredientDto } from "../../dto/update-ingredient.dto";
import { Ingredient } from "../../entities/ingredient.entity";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { skip } from "rxjs";
import { Prisma } from "@prisma/client";

@Injectable()
export class IngredientsRepositoryInPrisma implements IngredientsRepository {
    constructor(private readonly prisma: PrismaService) { }
    async findManyOrderInProcessToListShopping(orderStatus: string, client: string, orderType: string): Promise<any> {
        const sql = `
          select i.description,
            CAST(count(r.id)  AS INT) as "count_rev",
            CAST(sum(ir.amount_ingredient) AS INT) as "quantity_to_buy", 
            i."unit_of_measurement" ,
            CAST(sum((ir.amount_ingredient * value_per_serving)) AS DECIMAL(12, 2)) as "value_prediction" 
            from "Ingredients" i 
                inner join "Ingredients_Revenues" ir on i.id = ir.fk_ingredient
                inner join "Revenues" r on ir.fk_revenues  = r.id 
                inner join "OrderItem" oi on oi.fk_revenue = r.id
                inner join "Order" o on o.id = oi.fk_order 
                where o.fk_orderstatus like '%${orderStatus}%' and o.fk_user like '%${client}%' and CAST(o."order_type"  AS VARCHAR(255)) like '%${orderType}%'
                group by i.id,i.description, i."unit_of_measurement";
        `
        try {
            const result = await this.prisma.$queryRaw(Prisma.raw(sql)).finally(() => {
                this.prisma.$disconnect()
            });

            return result;
        } catch (error) {
            console.log(error);

        }



    }

    async updateAmount(id: string, amount: number): Promise<void> {
        await this.prisma.ingredients.update({
            data: {

                amount_actual: amount,
                updated_t: new Date()
            },
            where: {
                id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        });
    }

    async listFluxoIngredient(control: boolean): Promise<Ingredient[]> {
        const data = await this.prisma.ingredients.findMany({
            include: {
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
                value_per_serving: createIngredientDto.value_per_serving,
                amount: createIngredientDto.amount,
                amount_actual: createIngredientDto.amount_actual,
                unit_of_measurement: createIngredientDto.unit_of_measurement,
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
                value_per_serving: updateIngredientDto.value_per_serving,
                amount: updateIngredientDto.amount,
                unit_of_measurement: updateIngredientDto.unit_of_measurement,
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