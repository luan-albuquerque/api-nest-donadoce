import { CreateClientCompany } from "../../dto/create-client-company.dto";
import { PaginationOptions } from "../../dto/pagination-options.dto";
import { ClientCompany } from "../../entities/clients_company.entity";

export abstract class ClientsCompanyRepository {
    abstract create(createClientCompany: CreateClientCompany[]):Promise<void>
    abstract findAll(page: PaginationOptions): Promise<ClientCompany[]>
    abstract findOneByClient(fk_client: string): Promise<ClientCompany[]>
    abstract remove(fk_client: string,fk_company: string): Promise<void>
}