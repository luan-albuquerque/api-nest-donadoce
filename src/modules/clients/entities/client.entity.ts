import { Company } from "src/modules/company/entities/company.entity"

export class Client {

    id: string
    corporate_name: string
    cnpj: string
    fone?: string
    email: string
    password: string
    address: string
    cep: string
    is_enabled: boolean
    createdAt: Date
    updateAt?: Date
    Company?: Company[]
}
