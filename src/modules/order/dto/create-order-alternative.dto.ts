
import { IsNotEmpty } from "class-validator";
import { CreateOrderDto } from "./create-order.dto";

class CreateOrderItemDto {

    fk_revenue: string;
    fk_categoryOrderItem: string
    of_menu: boolean
    homologate?: any;
    valueOrderItem: number;
    dateOrderItem: Date
    amountItem: number


}

enum Homologate {
    "EM_HOMOLOGACAO",
    "APROVADO",
    "REPROVADO"
  }

export class CreateOrderAlternativeDto {
    fk_user: string
    dateOrder: Date
    valueOrder: number
    fk_orderstatus: string
    createOrderItemDto: CreateOrderItemDto[]

}
