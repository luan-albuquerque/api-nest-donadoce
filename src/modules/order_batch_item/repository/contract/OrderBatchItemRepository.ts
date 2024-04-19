import { CreateOrderBatchItemManual } from "../../dto/create_order_batch_item_manual.dto";
import { RemoveOrderBatchItem } from "../../dto/remove_order_batch_item.dto";
import { OrderBatchItem } from "../../entities/order_batch_item.entity";


export abstract class OrderBatchItemRepository {
    abstract addItem(data: CreateOrderBatchItemManual[]): Promise<void>
    abstract findBy(fk_order: string, fk_orderBatch: string): Promise<OrderBatchItem>
    abstract findAll(): Promise<OrderBatchItem[]>
    abstract delete(id: string): Promise<void>
    abstract removeItem(data: RemoveOrderBatchItem): Promise<void>
}