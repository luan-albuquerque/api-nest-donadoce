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
import { CreateRevenueIngredientService } from './modules/revenue_ingredient/services/create-revenue_ingredient.service';
import { DeleteRevenueIngredientService } from './modules/revenue_ingredient/services/delete-revenue_ingredient.service';
import { UpdateRevenueIngredientService } from './modules/revenue_ingredient/services/update-revenue_ingredient.service';
import { CreateRevenueService } from './modules/revenue/services/create-revenue.service';
import { UpdateRevenueService } from './modules/revenue/services/update-revenue.service';
import { DeleteRevenueService } from './modules/revenue/services/delete-revenue.service';
import { FindAllRevenueService } from './modules/revenue/services/find-all-revenue.service';
import { FindOneRevenueService } from './modules/revenue/services/find-one-revenue.service';
import EnsureAuthenticatedMiddleware from './shared/http/middlewares/authenticated.middleware';
import EnsureAdminMiddleware from './shared/http/middlewares/admin.middleware';


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
  ],
  controllers: [],
  providers: [
    PrismaService,
    CreateRevenueIngredientService,
    DeleteRevenueIngredientService,
    UpdateRevenueIngredientService,
    CreateRevenueService,
    UpdateRevenueService,
    DeleteRevenueService,
    FindAllRevenueService,
    FindOneRevenueService,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAuthenticatedMiddleware)
      .exclude(
      { method: RequestMethod.POST, path: "/session" },
      { method: RequestMethod.POST, path: '/session/send-email' },
      { method: RequestMethod.POST, path: '/session/redefine-password' }
).forRoutes("*")
    consumer.apply(EnsureAdminMiddleware).forRoutes("users")
  }

}
