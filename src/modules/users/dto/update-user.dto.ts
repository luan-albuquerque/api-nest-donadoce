import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class UpdateUserDto  {
    @IsString({ message: 'Esta variável de e-mail precisa ser string' })
    @IsEmail()
    @IsNotEmpty({ message: 'Esta variável de e-mail não pode esvazia' })
    @ApiProperty()
    email: string;
  
    // @IsString({ message: 'Esta variável de senha precisa ser string' })
    // @IsNotEmpty({ message: 'Esta variável de senha não pode esvaziar' })
    // @Length(4, 50, {
    //   message:
    //     'Esta variável de senha pode ter no mínimo 4 caracteres ou no máximo 50 caracteres',
    // })
    // @ApiProperty()
    // password: string;



    @ApiProperty()
    @IsBoolean({ message: 'O status da is_enabled precisa ser um boolean' })
    is_enabled?: boolean
    
    @ApiProperty()
    @IsBoolean({ message: 'O status da is_admin precisa ser um boolean' })
    is_admin?: boolean
    
    @ApiProperty()
    @IsBoolean({ message: 'O status da is_product precisa ser um boolean' })
    is_client?: boolean
}
