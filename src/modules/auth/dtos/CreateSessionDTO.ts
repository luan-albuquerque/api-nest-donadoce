import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

class CreateSessionDTO {

    @IsString({ message: 'Esta variável de e-mail precisa ser string' })
    @IsEmail()
    @IsNotEmpty({ message: 'Esta variável de e-mail não pode esvaziar' })
    @ApiProperty()
    email: string

    @IsString({ message: 'Esta variável de senha precisa ser string' })
    @Length(4, 50,
        {
            message:
                'Esta variável de senha pode ter no mínimo 4 caracteres ou no máximo 50 caracteres',
        })
    @IsNotEmpty({ message: 'Esta variável de senha não pode esvaziar' })
    @ApiProperty()
    password: string

}

export default CreateSessionDTO