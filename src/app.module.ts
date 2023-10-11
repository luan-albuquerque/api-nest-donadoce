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
import { PersonModule } from './modules/person/person.module';
import { ClientsCompanyModule } from './modules/clients_company/clients_company.module';
import { MenuModule } from './modules/menu/menu.module';
import { MenuItemsModule } from './modules/menu_items/menu_items.module';
import { OrderModule } from './modules/order/order.module';
import { CategoryOrderItemsModule } from './modules/category_order_items/category_order_items.module';
import { RevenuePerClientModule } from './modules/revenue-per-client/revenue-per-client.module';
import { OrderBatchModule } from './modules/order_batch/order_batch.module';
import { OrderBatchItemModule } from './modules/order_batch_item/order_batch_item.module';
import { ControlProduction } from './modules/control_production/control-production.module';
import { OrderItemModule } from './modules/order_item/order-item.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),

    }),
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    PersonModule,
    ClientsModule,
    UsersModule,
    MailModule,
    IngredientsModule,
    RevenueModule,
    RevenueIngredientModule,
    IngredientControlModule,
    CompanyModule,
    ClientsCompanyModule,
    MenuModule,
    MenuItemsModule,
    CategoryOrderItemsModule,
    RevenuePerClientModule,
    OrderModule,
    OrderItemModule,
    OrderBatchModule,
    OrderBatchItemModule,
    ControlProduction,

  ],
  controllers: [],
  providers: [
    PrismaService,
  ],
})

// export class AppModule {}
  export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAuthenticatedMiddleware)
      .exclude(

        { method: RequestMethod.ALL, path: "/img_revenue/(.*)" },
        { method: RequestMethod.ALL, path: "/caution/(.*)" },
        { method: RequestMethod.ALL, path: "/order_batch/(.*)" },
        { method: RequestMethod.POST, path: "/session" },
        { method: RequestMethod.POST, path: '/session/send-email' },
        { method: RequestMethod.POST, path: '/session/redefine-password' }
      ).forRoutes("*")
    // consumer.apply(EnsureAdminMiddleware).forRoutes("users")
  }

}