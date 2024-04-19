import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/contract/UserRepository";

@Injectable()
export class FindOneInforUserService { 

    constructor(
        private readonly userRepository: UserRepository
    ){}

  async execute(id_user: string ){

       return await this.userRepository.finInforUser(id_user)

  } 

}