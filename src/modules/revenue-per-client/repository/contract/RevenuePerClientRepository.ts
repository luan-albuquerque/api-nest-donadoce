import { CreateRevenuePerClientStatusDTO } from "../../dto/create-revenue-per-client.dto"
import { FiltersRevenuePerClientDTO } from "../../dto/filters-revenue-per-client.dto"
import { FindAllRevenuePerClient } from "../../dto/find-all-revenue-per-client.dto"
import { ListCrossJoinRevenueByClient } from "../../dto/list-cross-join-revenue-by-client.dto"
import { UpdateRevenuePerClientStatusDTO } from "../../dto/update-revenue-per-client-status.dto"
import { RevenuePerClient } from "../../entities/revenue-per-client.emtity"

export abstract class RevenuePerClientRepository {
    abstract create(data: CreateRevenuePerClientStatusDTO): Promise<void>
    abstract remove(fk_revenue: string, fk_client: string): Promise<void>
    abstract patchStatus(data: UpdateRevenuePerClientStatusDTO): Promise<void>
    abstract findAll(data: FiltersRevenuePerClientDTO): Promise<FindAllRevenuePerClient[]>
    abstract findAllNoFilter(): Promise<RevenuePerClient[]>
    abstract findAllNoFilterCompany(fk_company: string): Promise<RevenuePerClient[]>
    abstract findOne(fk_revenue: string, fk_client: string): Promise<RevenuePerClient>
    abstract findRevenuesByClient(fk_client: string, skip: number, take: number): Promise<ListCrossJoinRevenueByClient[]>
    abstract findAllByUser(fk_client: string): Promise<RevenuePerClient[]>

}