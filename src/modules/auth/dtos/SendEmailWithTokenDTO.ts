import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class SendEmailWithTokenDTO {

    @IsString({ message: 'Esta variável de e-mail precisa ser string' })
    @IsEmail()
    @IsNotEmpty({ message: 'Esta variável de e-mail não pode esvaziar' })
    @ApiProperty()
    email: string;
}

export default SendEmailWithTokenDTO