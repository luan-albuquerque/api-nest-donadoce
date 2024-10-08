import { Injectable } from "@nestjs/common";
import { IngredientControlRepository } from "../contract/IngredientControlRepository";
import { CreateIngredientControlDto } from "../../dto/create-ingredient_control.dto";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { Ingredient } from "src/modules/ingredients/entities/ingredient.entity";
import { Prisma } from "@prisma/client";

@Injectable()
export class IngredientControlRepositoryInPrisma implements IngredientControlRepository {
    constructor(private prisma: PrismaService){}
  
    
    async createFluxoIngredient(createIngredientControlDto: CreateIngredientControlDto): Promise<void> {
    

    

       await this.prisma.ingredient_control.create({
            data: {
               amount: createIngredientControlDto.amount,
               is_output: createIngredientControlDto.is_output,
               fk_ingredient: createIngredientControlDto.fk_ingredient,
               unitary_value: createIngredientControlDto.unitary_value,
               unit_of_measurement: createIngredientControlDto.unit_of_measurement,

            } 
        }).finally(() => {
            this.prisma.$disconnect()
        }).then(async()=>{
          const sql = `update "Ingredients" set amount_actual = amount_actual - ${createIngredientControlDto.amount} where id = '${createIngredientControlDto.fk_ingredient}'`;
           await this.prisma.$queryRaw(Prisma.raw(sql)).finally(() => {
                this.prisma.$disconnect()
            });
        })
        
    }

}