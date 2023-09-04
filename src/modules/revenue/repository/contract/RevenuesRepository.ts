import { CreateRevenueDto } from "../../dto/create-revenue.dto";
import { FiltersRevenueDTO } from "../../dto/filters-revenue.dto";
import { FindAllRevenueSummarized } from "../../dto/find-all-revenue-summarized.entity";
import { UpdateRevenueDto } from "../../dto/update-revenue.dto";
import { Revenue } from "../../entities/revenue.entity";



export abstract class RevenuesRepository {
        abstract create(createRevenueDto: CreateRevenueDto): Promise<Revenue>
        abstract remove(id: string):Promise<void>
        abstract putStatus(id: string):Promise<void>
        abstract findByOne(id: string):Promise<Revenue>
        abstract findByOneWithIngreditens(id: string):Promise<Revenue>
        abstract findByDescription(description: string):Promise<Revenue>
        abstract findByAll(data?:FiltersRevenueDTO):Promise<Revenue[]>
        abstract findByAllNotFilter():Promise<Revenue[]>
        abstract findByAllSummarized(data?:FiltersRevenueDTO):Promise<FindAllRevenueSummarized[]>
        abstract findByOneWithIngredients(id: string):Promise<Revenue>
        abstract update(id: string, updateRevenueDto:UpdateRevenueDto): Promise<void>
    
}