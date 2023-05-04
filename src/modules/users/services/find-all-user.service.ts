import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../repository/UserRepository';
import BCryptHash from '../providers/implementations/BCryptHash';
import IHash from '../providers/contract/IHash';
import { PaginationOptions } from '../dto/pagination-options.dto';


@Injectable()
export class FindAllUserService {
    constructor(
        private readonly userRepository: UserRepository
      ) {
      }

    async execute({ skip, limit }: PaginationOptions){
        const users = await this.userRepository.list({ skip, limit })

        return users
    }

}