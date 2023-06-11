import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateClientDto {
    @IsString({ message: 'Esta variável de corporate_name precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de corporate_name não pode esvaziar' })
    @ApiProperty()
    corporate_name: string

    @IsString({ message: 'Esta variável de cnpj precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de cnpj não pode esvaziar' })
    @ApiProperty()
    cnpj: string

    @ApiProperty({required: false})
    fone?: string

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

    @IsString({ message: 'Esta variável de address precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de address não pode esvaziar' })
    @ApiProperty()
    address: string

    @IsString({ message: 'Esta variável de cep precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de cep não pode esvaziar' })
    @ApiProperty()
    cep: string

}
