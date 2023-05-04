import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MailModule } from './modules/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/config/database/database.module';
import { PrismaService } from './shared/config/database/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import EnsureAuthenticatedMiddleware from './shared/http/middlewares/authenticated.middleware';
import EnsureAdminMiddleware from './shared/http/middlewares/admin.middleware';


@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    MailModule,
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [
    PrismaService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAuthenticatedMiddleware)
      .exclude({
        method: RequestMethod.POST, path: "/session"
      }).forRoutes("*")
    consumer.apply(EnsureAdminMiddleware).forRoutes("users")
  }

}
