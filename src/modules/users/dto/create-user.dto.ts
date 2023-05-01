import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsEmpty } from "class-validator"

export class CreateUserDto {
    @ApiProperty()
    @IsString({ message: 'Name deve ser do tipo string' })
    @IsEmpty({ message: 'Name não pode ser vazio'})
    name: string
    nickname: string
    password : string
    cpf: string
    fone: number
    email: string
    is_enabled?: boolean
    is_admin?: boolean
    is_product?: boolean
    is_stock?: boolean
    is_revenues?: boolean
    updateAt?: Date
}
