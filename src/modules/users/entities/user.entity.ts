import { Client } from "src/modules/clients/entities/client.entity"

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
}
