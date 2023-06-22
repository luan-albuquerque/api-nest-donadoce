import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common"
import ISendEmailConfirmPasswordDTO from "../dtos/ISendEmailConfirmPasswordDTO";


@Injectable()
export default class SendEmailConfirmRecoverPasswordService {
    constructor(private mailer: MailerService) {}

    async execute({ user}: ISendEmailConfirmPasswordDTO){
        await this.mailer.sendMail({
              to: user.email,
              from: "Dona Doce" + process.env.EMAIL_MAIL,
              subject: "Senha Redefinida com Sucesso",
              template: "confirmRedefinePassword",
              context:{
                name: user.email
              }
        }).catch((error)=>{
            console.log('ERROR SEND MAIL WITH TOKEN' + error)
        })

    }
}