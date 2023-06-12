import { Client } from "src/modules/clients/entities/client.entity"

export class Company {
    id: string
    corporate_name: string
    cnpj: string
    fone?: string
    email: string
    address: string
    cep: string
    is_enabled: boolean
    fk_clients: string
    createdAt: Date
    updateAt?: Date
    clients?: Client

}
