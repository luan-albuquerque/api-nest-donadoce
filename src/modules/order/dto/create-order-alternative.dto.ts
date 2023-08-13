
import { IsNotEmpty } from "class-validator";
import { CreateOrderDto } from "./create-order.dto";

class CreateOrderItemDto {

    fk_revenue: string;
    fk_categoryOrderItem: string
    of_menu: boolean
    valueOrderItem: number;
    dateOrderItem: Date
    amountItem: number


}

export class CreateOrderAlternativeDto {
    fk_user: string
    dateOrder: Date
    valueOrder: number
    fk_orderstatus: string
    createOrderItemDto: CreateOrderItemDto[]

}
