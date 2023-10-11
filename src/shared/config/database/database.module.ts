import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepositoryInPrisma } from '../../../modules/users/repository/implementations/UserRepositoryInPrisma';
import { TokenRepository } from 'src/modules/auth/repository/contract/TokenRepository';
import { TokenRepositoryInPrisma } from '../../../modules/auth/repository/implementations/TokenRepositoryInPrisma';
import { IngredientsRepository } from 'src/modules/ingredients/repository/contract/IngredientsRepository';
import { IngredientsRepositoryInPrisma } from 'src/modules/ingredients/repository/implementations/IngredientsRepositoryInPrisma';
import { RevenuesRepositoryInPrisma } from 'src/modules/revenue/repository/implementations/RevenuesRepositoryInPrisma';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { RevenuesIngredientsRepositoryInPrisma } from 'src/modules/revenue_ingredient/repository/implementations/RevenuesIngredientsRepositoryInPrisma';
import { RevenuesIngredientsRepository } from 'src/modules/revenue_ingredient/repository/contract/RevenuesIngredientsRepository';
import { IngredientControlRepository } from 'src/modules/ingredient_control/repository/contract/IngredientControlRepository';
import { IngredientControlRepositoryInPrisma } from 'src/modules/ingredient_control/repository/implementations/IngredientControlRepositoryInPrisma';
import { ClientsRepository } from 'src/modules/clients/repository/contract/ClientsRepository';
import { ClientsRepositoryInPrisma } from 'src/modules/clients/repository/implementations/ClientsRepositoryInPrisma';
import { CompanyRepository } from 'src/modules/company/repository/contract/CompanyRepository';
import { CompanyRepositoryInPrisma } from 'src/modules/company/repository/implementations/CompanyRepositoryInPrisma';
import { PersonRepository } from 'src/modules/person/repository/contract/PersonRepository';
import { PersonRepositoryInPrisma } from 'src/modules/person/repository/implementations/PersonRepositoryInPrisma';
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';
import { ClientsCompanyRepository } from 'src/modules/clients_company/repository/contract/ClientsCompanyRepository';
import { ClientsCompanyRepositoryInPrisma } from 'src/modules/clients_company/repository/implementations/ClientsCompanyRepositoryInPrisma';
import { MenuRepository } from 'src/modules/menu/repository/contract/MenuRepository';
import { MenuRepositoryInPrisma } from 'src/modules/menu/repository/implementations/MenuRepositoryInPrisma';
import { MenuItemRepository } from 'src/modules/menu_items/repository/contract/MenuItemRepository';
import { MenuItemRepositoryInPrisma } from 'src/modules/menu_items/repository/implementations/MenuItemRepositoryInPrisma';
import { CategoryOrderItemRepository } from 'src/modules/category_order_items/repository/contract/CategoryOrderItemRepository';
import { CategoryOrderItemRepositoryInPrisma } from 'src/modules/category_order_items/repository/implementations/CategoryOrderItemRepositoryInPrisma';
import { RevenuePerClientRepository } from 'src/modules/revenue-per-client/repository/contract/RevenuePerClientRepository';
import { RevenuePerClientRepositoryInPrisma } from 'src/modules/revenue-per-client/repository/implementations/RevenuePerClientRepositoryInPrisma';
import { OrderRepository } from 'src/modules/order/repository/contract/OrderRepository';
import { OrderRepositoryInPrisma } from 'src/modules/order/repository/implemantations/OrderRepositoryInPrisma';
import { OrderBatchRepositoryInPrisma } from 'src/modules/order_batch/repository/implemantations/OrderBatchRepositoryInPrisma';
import { OrderBatchRepository } from 'src/modules/order_batch/repository/contract/OrderBatchRepository';
import { OrderBatchItemRepository } from 'src/modules/order_batch_item/repository/contract/OrderBatchItemRepository';
import { OrderBatchItemRepositoryInPrisma } from 'src/modules/order_batch_item/repository/implemantations/OrderBatchItemRepositoryInPrisma';
import { ControlProductionRepositoryInPrisma } from 'src/modules/control_production/repository/implementations/ControlProductionRepositoryInPrisma';
import { ControlProductionRepository } from 'src/modules/control_production/repository/contract/ControlProductionRepository';
import { OrderItemRepository } from 'src/modules/order_item/repository/contract/OrderItemRepository';
import { OrderItemRepositoryInPrisma } from 'src/modules/order_item/repository/implemantations/OrderItemRepositoryInPrisma';


@Module({
  providers: [
    PrismaService,
    {
      provide: CategoryOrderItemRepository,
      useClass: CategoryOrderItemRepositoryInPrisma
    },
    {
      provide: MenuRepository,
      useClass: MenuRepositoryInPrisma,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryInPrisma,
    },
    {
      provide: TokenRepository,
      useClass: TokenRepositoryInPrisma
    },
    {
      provide: IngredientsRepository,
      useClass: IngredientsRepositoryInPrisma
    },
    {
      provide: RevenuesRepository,
      useClass: RevenuesRepositoryInPrisma
    },
    {
      provide: RevenuesIngredientsRepository,
      useClass: RevenuesIngredientsRepositoryInPrisma

    },
    {
      provide: IngredientControlRepository,
      useClass: IngredientControlRepositoryInPrisma

    },
    {
      provide: ClientsRepository,
      useClass: ClientsRepositoryInPrisma,

    },
    {
      provide: CompanyRepository,
      useClass: CompanyRepositoryInPrisma
    },
    {
      provide: PersonRepository,
      useClass: PersonRepositoryInPrisma,
    },
    {
      provide: ClientsCompanyRepository,
      useClass: ClientsCompanyRepositoryInPrisma
    },
    {
      provide: MenuItemRepository,
      useClass: MenuItemRepositoryInPrisma
    },
    {
      provide: RevenuePerClientRepository,
      useClass: RevenuePerClientRepositoryInPrisma
    },
    {
      provide: OrderRepository,
      useClass: OrderRepositoryInPrisma
    },
    {
      provide: OrderBatchRepository,
      useClass: OrderBatchRepositoryInPrisma
    },
    {
      provide: OrderBatchItemRepository,
      useClass: OrderBatchItemRepositoryInPrisma
    },
    {
      provide: ControlProductionRepository,
      useClass: ControlProductionRepositoryInPrisma,
    },
    {
      provide: OrderItemRepository,
      useClass: OrderItemRepositoryInPrisma,
    }
    
  ],
  
  exports: [
    OrderRepository,
    OrderItemRepository,
    OrderBatchRepository,
    OrderBatchItemRepository,
    RevenuePerClientRepository,
    MenuItemRepository,
    CategoryOrderItemRepository,
    MenuRepository,
    UserRepository,
    TokenRepository,
    IngredientsRepository,
    RevenuesRepository,
    RevenuesIngredientsRepository,
    IngredientControlRepository,
    ClientsRepository,
    CompanyRepository,
    PersonRepository,
    ClientsCompanyRepository,
    ControlProductionRepository
    ]
})
export class DatabaseModule { }
