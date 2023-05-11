import { Injectable } from "@nestjs/common";
import { Token } from "src/modules/auth/entities/Token";
import { TokenRepository } from "src/modules/auth/repository/TokenRepository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class TokenRepositoryInPrisma implements TokenRepository {
    constructor(private readonly prisma: PrismaService){}
    create(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findbyOne(user_id: string): Promise<Token> {
        const data = await this.prisma.token.findFirst({
            where:{
                user_id
            },
            orderBy:{
                created_at: "desc"
            }
        }).finally(()=>{
            this.prisma.$disconnect()
        })

        return data
    }
    
}