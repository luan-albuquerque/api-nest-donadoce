import { Injectable, Inject } from '@nestjs/common';
import { PersonRepository } from '../repository/contract/PersonRepository';
import { PaginationOptions } from '../dto/pagination-options.dto';


@Injectable()
export class FindAllPersonService {
    constructor(
        private readonly personRepository: PersonRepository,

      ) {
      }

    async execute({ skip, limit }: PaginationOptions){
        const users = await this.personRepository.list({ skip, limit })

        return users
    }

}