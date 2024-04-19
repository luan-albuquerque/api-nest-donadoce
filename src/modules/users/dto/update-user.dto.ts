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
  
    @IsString({ message: 'Esta variável de senha precisa ser string' })
    @ApiProperty()
    password?: string;

    @ApiProperty()
    @IsBoolean({ message: 'O status da is_enabled precisa ser um boolean' })
    is_enabled?: boolean
    
    @ApiProperty()
    @IsBoolean({ message: 'O status da is_admin precisa ser um boolean' })
    is_admin?: boolean
    
    @ApiProperty()
    @IsBoolean({ message: 'O status da is_product precisa ser um boolean' })
    is_client?: boolean

    @ApiProperty()
    @IsBoolean({ message: 'O status da is_driver precisa ser um boolean' })
    is_driver?: boolean

        
    @ApiProperty()
    @IsBoolean({ message: 'O status da is_production precisa ser um boolean' })
    is_production?: boolean

    @ApiProperty()
    @IsBoolean({ message: 'O status da is_company precisa ser um boolean' })
    is_company?: boolean
}
