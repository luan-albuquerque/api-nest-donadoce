import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../repository/contract/UserRepository";
import { User } from "@prisma/client";

@Injectable()
export class FindOneInforUserService { 

    constructor(
        private readonly userRepository: UserRepository
    ){}

  async execute(id_user: string ){

    const user = await this.userRepository.findById(id_user)
    if (!user) {
        throw new UnauthorizedException(
            "Usuario não existe"
        )
    }
       return await this.userRepository.finInforUser(id_user)

  } 

}