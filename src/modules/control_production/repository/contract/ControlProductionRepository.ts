import { Injectable } from "@nestjs/common";
import { CreateControlProductionDto } from "../../dtos/create-control-production.dto";
import { ControlProductionProductEntity } from "../../entity/control-production-product.entity";
import { FindItemProductionDto } from "../../dtos/find-item-production.dto";
import { UpdateControlProductionProductDto } from "../../dtos/update-control-production.dto";


export abstract class ControlProductionRepository {
   
    abstract updateItemProduction(data: UpdateControlProductionProductDto): Promise<void>
    abstract createItemProduction(data: CreateControlProductionDto): Promise<void>
    abstract findItemProduction(data: FindItemProductionDto): Promise<ControlProductionProductEntity>
    abstract findAllControlProductionProduct(delivery_date: Date): Promise<ControlProductionProductEntity[]>
    abstract findSeqControlProductProductInDay(delivery_date: Date): Promise<number>
    abstract updateSequencialProduct(id: string, seq: number): Promise<void>


}