import { CreateOrderAlternativeDto } from "../../dto/create-order-alternative.dto";
import { ListByClientOrderDTO } from "../../dto/list-by-client-order.dto";
import { ListByAdminOrderDTO } from "../../dto/list-by-admin-order.dto";
import { OrderAlternative } from "../../entities/order-alternative.entity";
import { OrderAdmin } from "../../entities/order-admin.entity";

export abstract class OrderRepository {
    abstract create(data: CreateOrderAlternativeDto): Promise<void>
    abstract findManyByClient(data: ListByClientOrderDTO): Promise<OrderAlternative[]>
    abstract findMany(data: ListByAdminOrderDTO): Promise<OrderAdmin[]>
}