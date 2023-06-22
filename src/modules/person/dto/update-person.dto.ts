import { PartialType } from '@nestjs/swagger';
import { CreatePersonDto } from './create-person.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';

export class UpdatePersonDto {
    name: string
    fone?: string
    address: string
    cep: string
    updateUserDto: UpdateUserDto
    
}
