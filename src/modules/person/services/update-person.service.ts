import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';

import BCryptHash from '../providers/implementations/BCryptHash';
import IHash from '../providers/contract/IHash';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { PersonRepository } from '../repository/contract/PersonRepository';
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';


@Injectable()
export class UpdatePersonService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly personRepository: PersonRepository,

    @Inject(BCryptHash) private readonly hashPassword: IHash
  ) { }

  async execute(id: string, updatePersonDto: UpdatePersonDto) {

    const userFindById = await this.personRepository.findOneById(id);

    const userFindByMail = await this.userRepository.findByMail(updatePersonDto.updateUserDto.email);

    if (!userFindById) {
        throw new HttpException('Id não encontrado', HttpStatus.NOT_FOUND)
      }

    if (userFindByMail && userFindById.user.email != updatePersonDto.updateUserDto.email) {
      throw new HttpException('Email já existente', HttpStatus.CONFLICT)
    }

 

    const data: UpdatePersonDto = {
      address: updatePersonDto.address,
      cep: updatePersonDto.cep,
      name: updatePersonDto.name,
      fone: updatePersonDto.fone,
      updateUserDto: {
        email: updatePersonDto.updateUserDto.email,
        is_enabled: updatePersonDto.updateUserDto.is_enabled,
        is_admin: updatePersonDto.updateUserDto.is_admin,
      }
    }


    await this.personRepository.update(id, data)




  }

}