import { CreateClientCompany } from "../../dto/create-client-company.dto";
import { PaginationOptions } from "../../dto/pagination-options.dto";
import { UpdateClientCompany } from "../../dto/update-client-company.dto";
import { ClientCompany } from "../../entities/clients_company.entity";

export abstract class ClientsCompanyRepository {
    abstract create(createClientCompany: CreateClientCompany[]):Promise<void>
    abstract update(updateClientCompany: UpdateClientCompany):Promise<void>
    abstract createOne(accountable:string, fone: string, fk_client: string, fk_company: string, fk_user: string):Promise<void>
    abstract findAll(page: PaginationOptions): Promise<ClientCompany[]>
    abstract findOneByClient(fk_client: string): Promise<ClientCompany[]>
    abstract findOneByClientAndCompany(fk_client: string,fk_company: string): Promise<ClientCompany>
    abstract remove(fk_client: string,fk_company: string): Promise<void>
    abstract removeAll(fk_client: string): Promise<void>
}