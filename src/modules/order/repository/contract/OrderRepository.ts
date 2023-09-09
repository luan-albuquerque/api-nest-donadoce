import { CreateOrderAlternativeDto } from "../../dto/create-order-alternative.dto";
import { ListByClientOrderDTO } from "../../dto/list-by-client-order.dto";
import { ListByAdminOrderDTO } from "../../dto/list-by-admin-order.dto";
import { OrderAlternative } from "../../entities/order-alternative.entity";
import { OrderAdmin } from "../../entities/order-admin.entity";
import { Order } from "../../entities/order.entity";
import { PatchStatusOrderItemDto } from "../../dto/patch-status-order-item.";
import { PatchHomologateOrder } from "../../dto/patch-homologate-order.dto";
import { OrderItem } from "../../entities/order-item.entity";

export abstract class OrderRepository {
    //Order
    abstract create(data: CreateOrderAlternativeDto): Promise<void>
    abstract patchStatus(id: string, fk_status_order: string): Promise<void>
    abstract patchStatusOrderItem(id: string, data: PatchStatusOrderItemDto): Promise<void>
    abstract findManyByClient(data: ListByClientOrderDTO): Promise<OrderAlternative[]>
    abstract findMany(data: ListByAdminOrderDTO): Promise<OrderAdmin[]>
    abstract findOne(numberOrder: number): Promise<Order[]>
    abstract findById(id: string): Promise<Order>
    abstract findManyOrderByClientNotOrderBatch(fk_client: string): Promise<Order[]>
    abstract findManyNotFilter(): Promise<Order[]>

    //OrderItem
    abstract patchTrayOrder(id: string, amount_of_tray: number): Promise<void>
    abstract findOneOrderItem(fk_categoryOrderItem: string, fk_order: string, fk_revenue: string): Promise<OrderItem>
    abstract UpdateOrderItemHomologate(data: PatchHomologateOrder): Promise<void>
    abstract findAllOrdersInProcess(): Promise<OrderItem[]>
}