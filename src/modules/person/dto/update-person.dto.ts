import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePersonDto } from './create-person.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UpdatePersonDto {

    @IsString({ message: 'Esta variável de name precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de name não pode esvazia' })
    @ApiProperty()
    name: string

    @ApiProperty()
    @IsPhoneNumber("BR", { message: "Numero de telefone invalido"})
    fone?: string

    @IsString({ message: 'Esta variável de address precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de address não pode esvazia' })
    @ApiProperty()
    address: string

    @IsString({ message: 'Esta variável de cep precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de cep não pode esvazia' })
    @ApiProperty()
    cep: string

    @ApiProperty({ type: UpdateUserDto})
    @Type(()=> UpdateUserDto)
    updateUserDto: UpdateUserDto
    
}
