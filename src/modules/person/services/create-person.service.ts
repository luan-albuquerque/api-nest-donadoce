import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import BCryptHash from '../providers/implementations/BCryptHash';
import IHash from '../providers/contract/IHash';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';
import { PersonRepository } from '../repository/contract/PersonRepository';



@Injectable()
export class CreatePersonService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly personRepository: PersonRepository,
    @Inject(BCryptHash) private readonly hashPassword: IHash
  ) { }

  async execute(createPersonDto: CreatePersonDto) {
   
    createPersonDto.name = createPersonDto.name.toUpperCase();
    
    delete createPersonDto.createUser.is_admin

    const userFindByMail = await this.userRepository.findByMail(createPersonDto.createUser.email);

    if (userFindByMail) {
      throw new HttpException('Email já existente', HttpStatus.CONFLICT)
    }


    const passwordHash: string = await this.hashPassword.generateHash(createPersonDto.createUser.password)

    const data: CreatePersonDto = {
      address: createPersonDto.address,
      cep: createPersonDto.cep,
      name: createPersonDto.name,
      fone: createPersonDto.fone,
      createUser: {
        email: createPersonDto.createUser.email,
        password: passwordHash,
        is_enabled: true,
        is_admin: false,
        is_client: false,
        is_driver: createPersonDto.createUser.is_driver,
        is_production: createPersonDto.createUser.is_production
      }
    }


    await this.personRepository.create(data)




  }

}