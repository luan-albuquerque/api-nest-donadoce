import { CreateRevenuePerCompanyStatusDTO } from "../../dto/create-revenue-per-company.dto";
import { FiltersRevenuePerCompanyDTO } from "../../dto/filters-revenue-per-company.dto";
import { FindAllRevenuePerCompany } from "../../dto/find-all-revenue-per-company.dto";
import { UpdateRevenuePerCompanyStatusDTO } from "../../dto/update-revenue-per-company-status.dto";
import { RevenuePerCompany } from "../../entities/revenue-per-company.emtity";

export abstract class RevenuePerCompanyRepository {
    abstract create(data: CreateRevenuePerCompanyStatusDTO): Promise<void>
    abstract remove(fk_revenue: string, fk_company: string): Promise<void>
    abstract patchStatus(data: UpdateRevenuePerCompanyStatusDTO): Promise<void>
    abstract findAll(data: FiltersRevenuePerCompanyDTO): Promise<FindAllRevenuePerCompany[]>
    abstract findOne(fk_revenue: string, fk_company: string): Promise<RevenuePerCompany>

}