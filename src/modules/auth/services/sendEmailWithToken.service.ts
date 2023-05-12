import { Injectable, NotFoundException } from '@nestjs/common';
import { addDays } from 'date-fns';
import SendEmailWithTokenDTO from 'src/modules/auth/dtos/SendEmailWithTokenDTO';
import { TokenRepository } from 'src/modules/auth/repository/TokenRepository';
import SendEmailWithTokenForRecoverPasswordService from 'src/modules/mail/services/sendMailToken.service';
import { UserRepository } from 'src/modules/users/repository/UserRepository';

@Injectable()
export default class SendEmailWithTokenService {

    constructor(
        private readonly tokenRepository: TokenRepository,
        private readonly userRepository: UserRepository,
        private readonly mail: SendEmailWithTokenForRecoverPasswordService,
    ) { }

    async execute({ email }: SendEmailWithTokenDTO) {

        const user = await this.userRepository.findByMail(email);

        if (!user) {
            throw new NotFoundException('This user does not exists in database');
        }
        const findLastToken = await this.tokenRepository.findbyOne(user.id)

        if (findLastToken && !findLastToken.used && findLastToken.used_in === null) {
            //    Manda o email

            await this.mail.execute({ user, token: findLastToken.token })

            return findLastToken;
        } else {
            const expires_in: Date = addDays(new Date(), 1);

            const token = await this.tokenRepository.create({
                user_id: user.id,
                expires_in
            })

            await this.mail.execute({ user, token: token.token })

            return token
        }


    }


}
