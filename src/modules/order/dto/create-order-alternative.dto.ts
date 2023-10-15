import { Homologate } from "../types/homologate.type";
import { OrderType } from "../types/ordertype.type";
import { MethodOfPreparationType } from "../types/method-of-preparation.type";

class CreateOrderItemDto {

    fk_revenue: string;
    fk_categoryOrderItem: string
    of_menu: boolean
    homologate?: Homologate;
    valueOrderItem: number;
    method_of_preparation: MethodOfPreparationType
    delivery_date: Date;
    dateOrderItem: Date
    amountItem: number


}


export class CreateOrderAlternativeDto {
    fk_user: string
    dateOrder: Date
    order_type: OrderType
    valueOrder: number
    fk_company: string
    fk_orderstatus: string
    createOrderItemDto: CreateOrderItemDto[]

}
