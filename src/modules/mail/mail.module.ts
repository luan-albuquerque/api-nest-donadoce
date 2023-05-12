import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { DatabaseModule } from 'src/shared/config/database/database.module';
import SendEmailWithTokenForRecoverPasswordService from './services/sendMailToken.service';
import SendEmailConfirmRecoverPasswordService from './services/sendEmailConfirmRecoveyPassword.service';
@Module({
  imports:[
    DatabaseModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: process.env.EMAIL_SERVICE,
          // host: process.env.EMAIL_HOST,
          // port: Number(process.env.EMAIL_PORT),
          secure: false,
          ignoreTLS: false,
          auth: {
            user:  process.env.EMAIL_MAIL,
            pass:  process.env.PASSWORD_MAIL
          },
        },
        defaults: {
          from: `"No reply this email" <${process.env.EMAIL_MAIL}>`,
        },
        template: {
          dir: process.cwd() + "/src/modules/mail/template",
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  // controllers: [],
  providers: [
    SendEmailConfirmRecoverPasswordService,
    SendEmailWithTokenForRecoverPasswordService],
  exports:[
    SendEmailConfirmRecoverPasswordService,
    SendEmailWithTokenForRecoverPasswordService
  ]
})


export class MailModule {}
