import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repository/UserRepository';
import BCryptHash from '../providers/implementations/BCryptHash';
import IHash from '../providers/contract/IHash';


@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(BCryptHash) private readonly hashPassword: IHash
  ) { }

  async execute(createUserDto: CreateUserDto) {

    delete createUserDto.is_admin
    const userFindByCpf = await this.userRepository.findByCpf(createUserDto.cpf);
    const userFindByMail = await this.userRepository.findByMail(createUserDto.email);
    if (userFindByCpf) {
      throw new HttpException('CPF já existente', HttpStatus.CONFLICT)
    }
    if (userFindByMail) {
      throw new HttpException('Email já existente', HttpStatus.CONFLICT)
    }

    const passwordHash: string = await this.hashPassword.generateHash(createUserDto.password)


    const data: CreateUserDto = {
      name: createUserDto.name,
      username: createUserDto.username,
      password: passwordHash,
      cpf: createUserDto.cpf,
      fone: null,
      email: createUserDto.email,
      is_enabled: true,
      is_admin: createUserDto.is_admin,
      is_product: createUserDto.is_product,
      is_stock: createUserDto.is_stock,
      is_revenues: createUserDto.is_revenues,
    }


    await this.userRepository.create(data)




  }

}