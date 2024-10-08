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
    async updateQuantity(id: string, amount: number): Promise<void> {
         await this.prisma.ingredients.updateMany({
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
    async findManyOrderInProcessToListShopping(orderStatus: string, client: string, orderType: string,  dataInitial: string, dataFinal: string): Promise<any> {
        const sql = `
        select i.description,
        i."unit_of_measurement" as "unit_of_measurement",
        CAST(sum(oi."amountItem")   AS INT) as "count_rev",
        CAST(max(ir.amount_ingredient)  * sum(oi."amountItem")  AS  DECIMAL(12,4)) as "quantity_to_buy_no_stock", 
        CAST(max((ir.amount_ingredient * value_per_serving)) * sum(oi."amountItem") AS DECIMAL(12, 4)) as "value_prediction_no_stock" ,
        max(i.amount_actual) as "stock",
        ABS((max(i.amount_actual) - max(ir.amount_ingredient)) *  sum(oi."amountItem")) as "quantity_to_buy", 
        ABS((CAST((max(i.amount_actual) - max(ir.amount_ingredient)) *  value_per_serving AS DECIMAL(12,8)) * sum(oi."amountItem"))) as "value_prediction"
        from "Ingredients" i 
              inner join "Ingredients_Revenues" ir on i.id = ir.fk_ingredient
              inner join "Revenues" r on ir.fk_revenues  = r.id 
              inner join "OrderItem" oi on oi.fk_revenue = r.id
              inner join "Order" o on o.id = oi.fk_order 
                where (oi.delivery_date >= '${dataInitial}' and oi.delivery_date <= '${dataFinal}' ) and o.fk_orderstatus like '%${orderStatus}%' and o.fk_user like '%${client}%' and CAST(o."order_type"  AS VARCHAR(255)) like '%${orderType}%'
                group by i.id,i.description,o.id, i."unit_of_measurement"
                having ((max(i.amount_actual) - CAST(max(ir.amount_ingredient) * sum(oi."amountItem") AS  DECIMAL(12,4)))) <= 0;
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

    async updateAmount(id: string, amount: number): Promise<Ingredient> {
        return await this.prisma.ingredients.update({
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
            },
            orderBy:{
                description: "asc"
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
                    description: "asc"
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