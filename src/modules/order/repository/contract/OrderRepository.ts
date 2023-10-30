import { CreateOrderAlternativeDto } from "../../dto/create-order-alternative.dto";
import { ListByClientOrderDTO } from "../../dto/list-by-client-order.dto";
import { ListByAdminOrderDTO } from "../../dto/list-by-admin-order.dto";
import { OrderAlternative } from "../../entities/order-alternative.entity";
import { OrderAdmin } from "../../entities/order-admin.entity";
import { Order } from "../../entities/order.entity";
import { PatchStatusOrderItemDto } from "../../dto/patch-status-order-item.";
import { PatchHomologateOrder } from "../../dto/patch-homologate-order.dto";
import { OrderItem } from "../../../order_item/entities/order-item.entity";
import { OrderType } from "../../types/ordertype.type";

export abstract class OrderRepository {
    //Order
    abstract create(data: CreateOrderAlternativeDto): Promise<void>
    abstract findOrderStatus(fk_status: string): Promise<boolean>
    abstract patchStatus(id: string, fk_status_order: string): Promise<void>
    abstract patchStatusByClient(id: string, fk_status_order: string, comment: string): Promise<void>
    abstract patchStatusOrderItem(id: string, data: PatchStatusOrderItemDto): Promise<void>
    abstract findManyByClient(data: ListByClientOrderDTO): Promise<OrderAlternative[]>
    abstract findMany(data: ListByAdminOrderDTO, dataInicial: Date, dataFinal: Date): Promise<OrderAdmin[]>
    abstract findOne(numberOrder: number): Promise<Order[]>
    abstract findById(id: string): Promise<Order>
    abstract findManyOrderByClientNotOrderBatch(fk_client: string): Promise<Order[]>
    abstract findManyNotFilter(): Promise<Order[]>
    abstract addCautionInOrder(id: string, file_caution: string): Promise<void>
    abstract addPaymentVoucherInOrder(id: string, file_payment_voucher: string): Promise<void>
    abstract addInvoiceInOrder(id: string, file_invoice: string, number_invoice: string): Promise<void>
    abstract findManyOrderInRoute(date_inicial: Date, date_final: Date, orderType: OrderType): Promise<Order[]>
    

 
}