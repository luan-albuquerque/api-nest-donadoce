import { OrderType } from "src/modules/order/types/ordertype.type"

export class FiltersRevenueDTO {

    skip?:number
    take?: number
    description?: string
    order_type?: OrderType

}
