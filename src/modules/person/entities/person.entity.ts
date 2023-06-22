import { User } from "src/modules/users/entities/user.entity"

export class Person {
    id: string
    name: string
    fone?: string
    address: string
    cep: string
    user?: User
}
