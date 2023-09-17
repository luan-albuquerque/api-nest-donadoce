import { Injectable } from "@nestjs/common";
import { CreateControlProductionProductDto } from "../../dtos/create-control-production-product.dto";
import { ControlProductionProductEntity } from "../../entity/control-production-product.entity";
import { FindItemProductionDto } from "../../dtos/find-item-production.dto";
import { UpdateControlProductionProductDto } from "../../dtos/update-control-production.dto";
import { OrderType } from "src/modules/order/types/ordertype.type";


export abstract class ControlProductionRepository {
    // By Product
    abstract updateItemProduction(data: UpdateControlProductionProductDto): Promise<void>
    abstract createItemProductionTypeProduct(data: CreateControlProductionProductDto): Promise<void>
    abstract findItemProduction(data: FindItemProductionDto): Promise<ControlProductionProductEntity>
    abstract findAllControlProductionProduct(order_type: OrderType): Promise<ControlProductionProductEntity[]>
    abstract findSeqControlProductProductInDay(delivery_date: Date): Promise<number>
    abstract updateSequencialProduct(id: string, seq: number): Promise<void>
    
    //By Client


}