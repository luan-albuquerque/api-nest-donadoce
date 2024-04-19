import { OrderType } from "../types/ordertype.type"

export class ListByAdminOrderDTO {

    skip?:number
    take?: number
    desc_user?: string
    order_status?: string
    orderType?: OrderType
    numberOrder?: number
    fk_client?: string
    data?: Date
    fk_company?: string


}
