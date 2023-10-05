import { Injectable } from "@nestjs/common";
import { CreateControlProductionProductDto } from "../../dtos/create-control-production-product.dto";
import { ControlProductionProductEntity } from "../../entity/control-production-product.entity";
import { FindItemProductionDto } from "../../dtos/find-item-production.dto";
import { UpdateControlProductionProductDto } from "../../dtos/update-control-production.dto";
import { OrderType } from "src/modules/order/types/ordertype.type";
import { UpdateControlProductionClientDto } from "../../dtos/update-control-production-client.dto";
import { FindItemProductionDtoClient } from "../../dtos/find-item-production-client.dto";
import { ControlProductionClientEntity } from "../../entity/control-production-client.entity";
import { CreateControlProductionClientDto } from "../../dtos/create-control-production-client.dto";


export abstract class ControlProductionRepository {
    // By Product
    abstract updateItemProduction(data: UpdateControlProductionProductDto): Promise<void>
    abstract createItemProductionTypeProduct(data: CreateControlProductionProductDto): Promise<void>
    abstract findItemProduction(data: FindItemProductionDto): Promise<ControlProductionProductEntity>
    abstract findSeqControlProductProductInDay(delivery_date: Date): Promise<number>
    abstract findAllControlProductionProduct(order_type: OrderType): Promise<ControlProductionProductEntity[]>
    abstract updateSequencialProduct(id: string, seq: number): Promise<void>
    
    //By Client
    abstract updateItemProductionClient(data: UpdateControlProductionClientDto): Promise<void>
    abstract findItemProductionClient(data: FindItemProductionDtoClient): Promise<ControlProductionClientEntity>
    abstract createItemProductionTypeClient(data: CreateControlProductionClientDto): Promise<void>
    abstract findAllControlProductionClient(order_type: OrderType): Promise<ControlProductionClientEntity[]>
    abstract updateSequencialClient(id: string, seq: number): Promise<void>


}