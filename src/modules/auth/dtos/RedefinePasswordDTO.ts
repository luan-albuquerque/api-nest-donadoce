import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator"

class RedefinePasswordDTO {

@IsString({ message: 'Esta variável de token precisa ser string' })
@IsNotEmpty({ message: 'Esta variável de token não pode esvaziar' })
@IsUUID()
@ApiProperty()
token: string

@IsString({ message: "Esta variável de senha precisa ser string"})
@IsNotEmpty({ message: "Esta variável de senha não pode esvaziar"})
@Length(4, 50, {
   message: "Esta variável de senha pode ter no mínimo 4 caracteres ou no máximo 50 caracteres"
})
@ApiProperty()
password: string

@IsString({ message: "Esta variável de senha de confirmação precisa ser string"})
@IsNotEmpty({ message: "Esta variável de senha de confirmação não ser vazia"})
@Length(4, 50, {
   message: "Esta variável de senha de confirmação pode ter no mínimo 4 caracteres ou no máximo 50 caracteres"
})
@ApiProperty()
confirmpassword: string



}


export default RedefinePasswordDTO