import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"
import { CreateUserDto } from "src/modules/users/dto/create-user.dto"

export class CreatePersonDto {
    @IsString({ message: 'Esta variável de name precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de name não pode esvazia' })
    @ApiProperty()
    name: string

    @ApiProperty()
    fone?: string

    @IsString({ message: 'Esta variável de address precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de address não pode esvazia' })
    @ApiProperty()
    address: string

    @IsString({ message: 'Esta variável de cep precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de cep não pode esvazia' })
    @ApiProperty()
    cep: string
 


    @ApiProperty({ type: CreateUserDto})
    @Type(()=> CreateUserDto)
    createUser: CreateUserDto
}
