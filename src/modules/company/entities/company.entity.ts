import { Client } from "src/modules/clients/entities/client.entity"
import { ClientCompany } from "src/modules/clients_company/entities/clients_company.entity"

export class Company {
    id?: string
    corporate_name: string
    cnpj: string
    county: string
    district: string
    priority?: number
    uf: string
    address: string
    cep: string
    createdAt: Date
    updateAt?: Date
    Client_Company?: ClientCompany[];

}
