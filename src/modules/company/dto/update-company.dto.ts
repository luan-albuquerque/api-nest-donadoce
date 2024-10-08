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

    @IsString({ message: 'Esta variável de address precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de address não pode esvaziar' })
    @ApiProperty()
    address: string

    @ApiProperty()
    @IsPostalCode('BR', { message: 'cep precisa ser no formato XXXXX-XXX'})
    cep: string

    @ApiProperty()
    @IsString({ message: 'Esta variável de county precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de county não pode esvaziar' })
    county: string

    @ApiProperty()
    @IsString({ message: 'Esta variável de district precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de district não pode esvaziar' })
    district: string


    @ApiProperty()
    @IsString({ message: 'Esta variável de uf precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de uf não pode esvaziar' })
    uf: string
}
