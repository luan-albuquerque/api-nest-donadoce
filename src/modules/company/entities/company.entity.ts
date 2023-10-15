import { Client } from "src/modules/clients/entities/client.entity"

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

}
