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
import { CategoryMenuItemRepository } from 'src/modules/category_menu_items/repository/contract/CategoryMenuItemRepository';
import { CategoryMenuItemRepositoryInPrisma } from 'src/modules/category_menu_items/repository/implementations/CategoryMenuItemRepositoryInPrisma';
import { MenuItemRepository } from 'src/modules/menu_items/repository/contract/MenuItemRepository';
import { MenuItemRepositoryInPrisma } from 'src/modules/menu_items/repository/implementations/MenuItemRepositoryInPrisma';


@Module({
  providers: [
    PrismaService,
    {
      provide: CategoryMenuItemRepository,
      useClass: CategoryMenuItemRepositoryInPrisma
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
    }
  ],
  exports: [
    CategoryMenuItemRepository,
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
    ClientsCompanyRepository
  ]
})
export class DatabaseModule { }
