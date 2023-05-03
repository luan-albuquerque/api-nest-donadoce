import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MailModule } from './modules/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/config/database/database.module';
import { PrismaService } from './shared/config/database/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    MailModule,
    ConfigModule.forRoot({ isGlobal: true }),],
  controllers: [],
  providers: [
    PrismaService,
  ],
})
export class AppModule { }
