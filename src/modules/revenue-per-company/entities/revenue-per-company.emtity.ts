import { Company } from "src/modules/company/entities/company.entity"
import { Revenue } from "src/modules/revenue/entities/revenue.entity"

export class RevenuePerCompany {
    fk_revenue: string
    fk_company: string
    unique_value: number
    company?: Company
    revenues?: Revenue
}