import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repository/UserRepository';
import BCryptHash from '../providers/implementations/BCryptHash';
import IHash from '../providers/contract/IHash';


@Injectable()
export class UpdateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(BCryptHash) private readonly hashPassword: IHash
  ) { }

  async execute(id: string, updateUserDto: UpdateUserDto) {

    delete updateUserDto.is_admin
    const userFindById = await this.userRepository.findById(id);
    // const userFindByCpf = await this.userRepository.findByCpf(updateUserDto.cpf);
    const userFindByMail = await this.userRepository.findByMail(updateUserDto.email);
    // const userFindByUsername = await this.userRepository.findByUsername(updateUserDto.username);
    if (!userFindById) {
        throw new HttpException('Id não encontrado', HttpStatus.NOT_FOUND)
      }
    // if (userFindByCpf && userFindById.cpf != updateUserDto.cpf) {
    //   throw new HttpException('CPF já existente', HttpStatus.CONFLICT)
    // }
    if (userFindByMail && userFindById.email != updateUserDto.email) {
      throw new HttpException('Email já existente', HttpStatus.CONFLICT)
    }

    // if (userFindByUsername && userFindById.username != updateUserDto.username) {
    //   throw new HttpException('Username já existente', HttpStatus.CONFLICT)
    // }

    // const passwordHash: string = await this.hashPassword.generateHash(updateUserDto.password)


    const data: UpdateUserDto = {
      name: updateUserDto.name,
      // username: updateUserDto.username,
      // password: passwordHash,
      // cpf: updateUserDto.cpf,
      fone: updateUserDto.fone,
      email: updateUserDto.email,
      is_enabled: updateUserDto.is_enabled,
      is_product: updateUserDto.is_product,
      is_stock: updateUserDto.is_stock,
      is_revenues: updateUserDto.is_revenues,
    }


    await this.userRepository.update(id, data)




  }

}