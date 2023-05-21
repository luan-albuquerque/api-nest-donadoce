import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/modules/users/repository/UserRepository';
import { UserRepositoryInPrisma } from './prisma/repositories/UserRepositoryInPrisma';
import { TokenRepository } from 'src/modules/auth/repository/TokenRepository';
import { TokenRepositoryInPrisma } from './prisma/repositories/TokenRepositoryInPrisma';
import { IngredientsRepository } from 'src/modules/ingredients/repository/contract/IngredientsRepository';
import { IngredientsRepositoryInPrisma } from 'src/modules/ingredients/repository/implementations/IngredientsRepositoryInPrisma';
import { RevenuesRepositoryInPrisma } from 'src/modules/revenue/repository/implementations/RevenuesRepositoryInPrisma';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { RevenuesIngredientsRepositoryInPrisma } from 'src/modules/revenue_ingredient/repository/implementations/RevenuesIngredientsRepositoryInPrisma';
import { RevenuesIngredientsRepository } from 'src/modules/revenue_ingredient/repository/contract/RevenuesIngredientsRepository';


@Module({
    providers: [
        PrismaService,
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

          }
    ],
    exports: [
      UserRepository, 
      TokenRepository,
      IngredientsRepository,
      RevenuesRepository,
      RevenuesIngredientsRepository
    ]
})
export class DatabaseModule { }
