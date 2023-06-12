import { PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString , IsPostalCode, IsPhoneNumber, IsEmail, IsBtcAddress, IsBoolean } from "class-validator"

export class UpdateCompanyDto   {
    @IsString({ message: 'Esta variável de corporate_name precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de corporate_name não pode esvaziar' })
    @ApiProperty()
    corporate_name: string
    
    @IsString({ message: 'Esta variável de cnpj precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de cnpj não pode esvaziar' })
    @ApiProperty()
    cnpj: string
    
    @ApiProperty()
    @IsPhoneNumber('BR',{message: 'Número de telefone precisa ser valido'})
    fone?: string

    @IsString({ message: 'Esta variável de e-mail precisa ser string' })
    @IsEmail()
    @IsNotEmpty({ message: 'Esta variável de e-mail não pode esvazia' })
    @ApiProperty()
    email: string

    @IsString({ message: 'Esta variável de address precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de address não pode esvaziar' })
    @ApiProperty()
    address: string

    @ApiProperty()
    @IsPostalCode('BR', { message: 'cep precisa ser no formato XXXXX-XXX'})
    cep: string



    @ApiProperty({required: true})
    @IsBoolean({ message: 'O status da is_enabled precisa ser um boolean' })
    is_enabled: boolean
}
