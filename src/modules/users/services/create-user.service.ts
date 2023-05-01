import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';


@Injectable()
export class CreateUserService {
//    constructor(private readonly ){}
execute(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

}