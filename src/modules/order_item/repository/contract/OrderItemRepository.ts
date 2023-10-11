import { PatchHomologateOrder } from "src/modules/order/dto/patch-homologate-order.dto";
import { OrderItem } from "../../entities/order-item.entity";
import { AddItemInOrderDTO } from "../../dto/add-item-in-order-programmed.dto";
import { RemoveItemInOrderDTO } from "../../dto/remove-item-in-order-programmed.dto";
import { PatchItemInOrderDTO } from "../../dto/patch-item-in-order-programmed.dto";

export abstract class OrderItemRepository {
       //OrderItem
       abstract patchTrayOrder(id: string, amount_of_tray: number): Promise<void>
       abstract findOneOrderItem(fk_categoryOrderItem: string, fk_order: string, fk_revenue: string): Promise<OrderItem>
       abstract UpdateOrderItemHomologate(data: PatchHomologateOrder): Promise<void>
       abstract findAllOrdersInProcess(): Promise<any>
       abstract addItemInOrder(data: AddItemInOrderDTO): Promise<void>
       abstract patchItemInOrder(data: PatchItemInOrderDTO): Promise<void>
       abstract removeItemInOrder(data: RemoveItemInOrderDTO): Promise<void>
}