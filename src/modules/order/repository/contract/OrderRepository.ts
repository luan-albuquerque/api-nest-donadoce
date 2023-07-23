import { CreateOrderAlternativeDto } from "../../dto/create-order-alternative.dto";
import { ListByClientOrderDTO } from "../../dto/list-by-client-order.dto";
import { OrderAlternative } from "../../entities/order-alternative.entity";

export abstract class OrderRepository {
    abstract create(data: CreateOrderAlternativeDto): Promise<void>
    abstract findManyByClient(data: ListByClientOrderDTO): Promise<OrderAlternative[]>
}