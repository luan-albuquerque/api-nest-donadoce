import { Injectable, NotFoundException } from '@nestjs/common';
import SendEmailWithTokenDTO from 'src/modules/auth/dtos/SendEmailWithTokenDTO';
import { TokenRepository } from 'src/modules/auth/repository/TokenRepository';
import { UserRepository } from 'src/modules/users/repository/UserRepository';

@Injectable()
export class SendMailToken {

    constructor(
        private readonly tokenRepository: TokenRepository,
        private readonly userRepository: UserRepository
    ){}

    async execute({ email }: SendEmailWithTokenDTO){
         
       const user = await this.userRepository.findByMail(email);

       if (!user) {
        throw new NotFoundException('This user does not exists in database');
      }
      const findLastToken = await this.tokenRepository.findbyOne(user.id)

      if(findLastToken && !findLastToken.used && findLastToken.used_in === null){
    //    Manda o email
      } else {
        
      }


    }


}
