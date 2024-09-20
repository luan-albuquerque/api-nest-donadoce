import { OrderType } from "src/modules/order/types/ordertype.type"

export class FindItemProductionDtoClient {

    fk_revenue?: string
    fk_categoryOrderItem?: string
    fk_ordertype?: OrderType
    fk_user: string
    delivery_date?: Date

}