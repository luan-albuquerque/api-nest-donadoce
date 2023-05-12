import { Injectable } from "@nestjs/common";
import { TokenRepository } from "src/modules/auth/repository/TokenRepository";
import { PrismaService } from "../prisma.service";
import Token from "src/modules/auth/entities/Token";
import CreateTokenDTO from "src/modules/auth/dtos/CreateTokenDTO";

@Injectable()
export class TokenRepositoryInPrisma implements TokenRepository {
    constructor(private readonly prisma: PrismaService) { }
    async update(id: string, used: boolean, used_in: Date): Promise<void> {
        await this.prisma.token.update({
            data: {
                used,
                used_in

            },
            where: {
                id
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
    }
    async findbyToken(token: string): Promise<Token> {
        const data = await this.prisma.token.findFirst({
            where: {
                token
            },
            orderBy: {
                created_at: "desc"
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
        return data
    }
    async findTokensByUser(user_id: string): Promise<Token[]> {
        const data = await this.prisma.token.findMany({
            where: {
                user_id
            },
            orderBy: {
                created_at: "desc"
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
        return data
    }
    async create({ expires_in, user_id }: CreateTokenDTO): Promise<Token> {
        const data = await this.prisma.token.create({
            data: {
                expires: expires_in,
                user_id,
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })
        return data
    }
    async findbyOne(user_id: string): Promise<Token> {
        const data = await this.prisma.token.findFirst({
            where: {
                user_id
            },
            orderBy: {
                created_at: "desc"
            }
        }).finally(() => {
            this.prisma.$disconnect()
        })

        return data
    }

}