import { CreateOrderBatch } from "../../dto/create_order_batch.dto";
import { FilterOrderBatch } from "../../dto/filter_order_batch.dto";
import { OrderBatch } from "../../entities/order_batch.entity";


export abstract class OrderBatchRepository {
     abstract findOrderBatch(data: FilterOrderBatch): Promise<OrderBatch[]> 
     abstract create(createOrderBatch: CreateOrderBatch): Promise<void>
}