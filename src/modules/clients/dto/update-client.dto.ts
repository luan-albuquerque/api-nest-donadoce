import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';

export class UpdateClientDto {
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

    @IsString({ message: 'Esta variável de name_fantasy precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de name_fantasy não pode esvaziar' })
    @ApiProperty()
    name_fantasy: string

    @IsString({ message: 'Esta variável de county precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de county não pode esvaziar' })
    @ApiProperty()
    county: string

    @IsString({ message: 'Esta variável de district precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de district não pode esvaziar' })
    @ApiProperty()
    district: string

    @IsString({ message: 'Esta variável de ie precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de ie não pode esvaziar' })
    @ApiProperty()
    ie: string

    @IsString({ message: 'Esta variável de uf precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de uf não pode esvaziar' })
    @Length(2,2,{message: "UF deve conter dois caracterís representando um estado"})
    @ApiProperty()
    uf: string
   
    @IsString({ message: 'Esta variável de address precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de address não pode esvaziar' })
    @ApiProperty()
    address: string

    @IsString({ message: 'Esta variável de cep precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de cep não pode esvaziar' })
    @ApiProperty()
    cep: string

    
    @IsString({ message: 'Esta variável de accountable precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de accountable não pode esvaziar' })
    @ApiProperty()
    accountable: string

    @ApiProperty({ type: UpdateUserDto})
    @Type(()=> UpdateUserDto)
    updateUserDto: UpdateUserDto
}
