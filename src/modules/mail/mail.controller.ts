import { Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailToken } from './services/sendMailToken.service';

@Controller('mail')
export class MailController {
  constructor(private readonly sendMailToken: SendMailToken) {}

  @Post()
  async createTeste(){
    // await this.sendMailToken.execute()
  }
}
