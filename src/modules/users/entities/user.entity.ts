export class User {
    id: string
    password? : string
    email: string
    is_enabled: boolean
    is_admin?: boolean
    is_client: boolean
    createdAt?: Date
    updateAt?: Date
}
