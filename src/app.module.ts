import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MailModule } from './modules/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/config/database/database.module';
import { PrismaService } from './shared/config/database/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { RevenueModule } from './modules/revenue/revenue.module';
import { RevenueIngredientModule } from './modules/revenue_ingredient/revenue_ingredient.module';
import EnsureAuthenticatedMiddleware from './shared/http/middlewares/authenticated.middleware';
import EnsureAdminMiddleware from './shared/http/middlewares/admin.middleware';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CompanyModule } from './modules/company/company.module';
import { IngredientControlModule } from './modules/ingredient_control/ingredient_control.module';
import { ClientsModule } from './modules/clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthModule,
    MailModule,
    IngredientsModule,
    RevenueModule,
    RevenueIngredientModule,
    IngredientControlModule,
    CompanyModule,
    ClientsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..', 'uploads'),
    }),
  ],
  controllers: [],
  providers: [
    PrismaService,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAuthenticatedMiddleware)
      .exclude(
      { method: RequestMethod.POST, path: "/session" },
      { method: RequestMethod.POST, path: "/clients/auth" },
      { method: RequestMethod.POST, path: '/session/send-email' },
      { method: RequestMethod.POST, path: '/session/redefine-password' }
).forRoutes("*")
    consumer.apply(EnsureAdminMiddleware).forRoutes("users")
  }

}