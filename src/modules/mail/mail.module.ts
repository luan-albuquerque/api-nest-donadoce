import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
@Module({
  imports:[
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
          from: `"não-responder" <${process.env.EMAIL_MAIL}>`,
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {}
