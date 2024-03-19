import { Client } from "src/modules/clients/entities/client.entity"
import { ClientCompany } from "src/modules/clients_company/entities/clients_company.entity"

export class User {
    id: string
    password? : string
    email: string
    is_enabled: boolean
    is_admin?: boolean
    is_client: boolean
    is_company: boolean
    createdAt?: Date
    updateAt?: Date
    Clients?: Client
    Client_Company?: ClientCompany
}
