import { CreateClientCompany } from "../../dto/create-client-company.dto";
import { ClientCompany } from "../../entities/clients_company.entity";

export abstract class ClientsCompanyRepository {
    abstract create(createClientCompany: CreateClientCompany[]):Promise<void>
    abstract findAll(): Promise<ClientCompany[]>
    abstract remove(id: string): Promise<void>
}