import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/modules/users/repository/UserRepository';
import { UserRepositoryInPrisma } from './prisma/repositories/UserRepositoryInPrisma';
import { TokenRepository } from 'src/modules/auth/repository/TokenRepository';
import { TokenRepositoryInPrisma } from './prisma/repositories/TokenRepositoryInPrisma';


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
        }
    ],
    exports: [UserRepository, TokenRepository]
})
export class DatabaseModule { }
