import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/modules/users/repository/UserRepository';
import { UserRepositoryInPrisma } from './prisma/repositories/UserRepositoryInPrisma';
import { TokenRepository } from 'src/modules/auth/repository/TokenRepository';
import { TokenRepositoryInPrisma } from './prisma/repositories/TokenRepositoryInPrisma';
import { IngredientsRepository } from 'src/modules/ingredients/repository/contract/IngredientsRepository';
import { IngredientsRepositoryInPrisma } from 'src/modules/ingredients/repository/implementations/IngredientsRepositoryInPrisma';


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
          }
    ],
    exports: [UserRepository, TokenRepository,IngredientsRepository]
})
export class DatabaseModule { }
