import { CreateOrderBatch } from "../../dto/create_order_batch.dto";
import { FilterOrderBatch } from "../../dto/filter_order_batch.dto";
import { UpdateOrderBatch } from "../../dto/update_order_batch.dto";
import { OrderBatch } from "../../entities/order_batch.entity";


export abstract class OrderBatchRepository {
     abstract findAllOrderBatch(data: FilterOrderBatch): Promise<OrderBatch[]> 
     abstract findOneOrderBatch(id: string): Promise<OrderBatch> 
     abstract delete(id: string): Promise<void> 
     abstract create(createOrderBatch: CreateOrderBatch): Promise<void>
     abstract update(id: string, updateOrderBatch: UpdateOrderBatch): Promise<void>
     abstract addPaymentVoucher(id: string, file: string): Promise<void>
}