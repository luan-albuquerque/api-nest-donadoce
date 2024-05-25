import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class UpdatePasswordUserDto  {

    @IsString({ message: 'Senha antiga precisa ser string' })
    @IsNotEmpty({ message: 'Senha antiga não pode ser vazio' })
    @ApiProperty()
    password_old: string;
  
    @IsString({ message: 'Senha precisa ser string' })
    @IsNotEmpty({ message: 'Senha não pode ser vazio' })
    @ApiProperty()
    password: string;

    @IsString({ message: 'Confirmação de senha precisa ser string' })
    @IsNotEmpty({ message: 'Confirmação de senha não pode ser vazio' })
    @ApiProperty()
    password_confirm: string;

   }
