import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/config/database/prisma/prisma.service";
import { OrderBatchItemRepository } from "../contract/OrderBatchItemRepository";



@Injectable()
export class OrderBatchItemRepositoryInPrisma implements OrderBatchItemRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    

}