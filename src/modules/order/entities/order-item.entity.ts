import { MethodOfPreparationType } from "../types/method-of-preparation.type"

export class OrderItem {
    fk_order: string
    fk_revenue: string
    fk_categoryOrderItem: string
    valueOrderItem: number
    of_menu: boolean
    homologate: string
    dateOrderItem: Date
    amountItem: number
    delivery_date: Date;
    method_of_preparation: MethodOfPreparationType
}
