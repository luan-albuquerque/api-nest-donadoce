import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsInt, IsBoolean, IsEmail, Length } from "class-validator"

export class CreateUserDto {
    @IsString({ message: 'Esta variável de nome precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de nome não pode esvaziar' })
    @ApiProperty()
    name: string;
  
    @IsString({ message: 'Esta variável de nome de usuário precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de nome de usuário não pode ficar vazia' })
    @Length(5, 20, {
      message:
        'Esta variável de nome de usuário pode ter no mínimo 5 caracteres ou no máximo 20 caracteres',
    })
    @ApiProperty()
    username: string;
  
    @IsString({ message: 'Esta variável de e-mail precisa ser string' })
    @IsEmail()
    @IsNotEmpty({ message: 'Esta variável de e-mail não pode esvazia' })
    @ApiProperty()
    email: string;
  
    @IsString({ message: 'Esta variável de senha precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de senha não pode esvaziar' })
    @Length(4, 50, {
      message:
        'Esta variável de senha pode ter no mínimo 4 caracteres ou no máximo 50 caracteres',
    })
    @ApiProperty()
    password: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'CPF não pode ser vazio'})
    cpf: string

    @ApiProperty()
    @IsInt({ message: 'Fone não pode ser string' })
    // @IsNotEmpty({ message: 'Fone não pode ser vazio' })
    fone?: number

    @ApiProperty()
    @IsBoolean({ message: 'O status da is_enabled precisa ser um boolean' })
    is_enabled?: boolean
    
    @ApiProperty()
    @IsBoolean({ message: 'O status da is_admin precisa ser um boolean' })
    is_admin?: boolean
    
    @ApiProperty()
    @IsBoolean({ message: 'O status da is_product precisa ser um boolean' })
    is_product?: boolean
     
    @ApiProperty()
    @IsBoolean({ message: 'O status da is_stock precisa ser um boolean' })
    is_stock?: boolean
    
    @ApiProperty()
    @IsBoolean({ message: 'O status da is_revenues precisa ser um boolean' })
    is_revenues?: boolean

    updateAt?: Date
}
