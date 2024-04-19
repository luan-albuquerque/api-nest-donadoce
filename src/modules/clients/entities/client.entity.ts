import { User } from "src/modules/users/entities/user.entity"

export class Client {
    id: string
    corporate_name: string
    name_fantasy: string
    cnpj: string
    county: string
    district: string
    ie: string
    uf: string
    fone: string
    address: string
    cep: string
    createdAt: Date
    updateAt?: Date
    user?: User
}
