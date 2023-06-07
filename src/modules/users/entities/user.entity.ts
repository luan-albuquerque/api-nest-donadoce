export class User {
    id: string
    name: string
    // username: string
    password? : string
    // cpf?: string
    fone?: string
    email: string
    is_enabled: boolean
    is_admin?: boolean
    is_product: boolean
    is_stock: boolean
    is_revenues: boolean
    createdAt?: Date
    updateAt?: Date
}
