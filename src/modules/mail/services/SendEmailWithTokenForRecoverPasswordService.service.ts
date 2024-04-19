import { MailerService } from "@nestjs-modules/mailer";
import * as dayjs from "dayjs"
import { Injectable } from "@nestjs/common"
import ISendEmailWithTokenDTO from "../dtos/ISendEmailWithTokenDTO";
@Injectable()
export default class SendEmailWithTokenForRecoverPasswordService {
  constructor(private mailer: MailerService) { }
  async execute({ user, token }: ISendEmailWithTokenDTO) {
    
    await this.mailer.sendMail({
      to: user.email,
      from: 'Dona Doce' + process.env.EMAIL_MAIL,
      subject: "Recuperar Senha",
      context: {
        name: user.email,
        token: token,
        date: dayjs(new Date()).format('DD/MM/YYYY HH:mm:ss')
      },
      template: 'sendToken',

    }).catch((error) => {
      console.log('ERROR SEND EMAIL WITH TOKEN' + error)
    })
  }

}