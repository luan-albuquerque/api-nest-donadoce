import { CreateRevenueDto } from "../../dto/create-revenue.dto";
import { UpdateRevenueDto } from "../../dto/update-revenue.dto";
import { Revenue } from "../../entities/revenue.entity";



export abstract class RevenuesRepository {
        abstract create(createRevenueDto: CreateRevenueDto): Promise<Revenue>
        abstract remove(id: string):Promise<void>
        abstract findByOne(id: string):Promise<Revenue>
        abstract findByDescription(description: string):Promise<Revenue>
        abstract findByAll():Promise<Revenue[]>
        abstract findByOneWithIngredients(id: string):Promise<Revenue>
        abstract update(id: string, updateRevenueDto:UpdateRevenueDto): Promise<void>
    
}