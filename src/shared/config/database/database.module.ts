import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/modules/users/repository/UserRepository';
import { UserRepositoryInPrisma } from './prisma/repositories/UserRepositoryInPrisma';


@Module({
    providers: [
        PrismaService,
        {
            provide: UserRepository,
            useClass: UserRepositoryInPrisma,
        },
    ],
    exports: [UserRepository]
})
export class DatabaseModule { }
