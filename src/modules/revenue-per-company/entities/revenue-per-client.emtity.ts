import { Company } from "src/modules/company/entities/company.entity"
import { Revenue } from "src/modules/revenue/entities/revenue.entity"

export class RevenuePerClient {
    fk_revenue: string
    fk_client: string
    unique_value: number
    revenues?: Revenue
}