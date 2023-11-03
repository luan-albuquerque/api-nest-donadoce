import { OrderType } from "../types/ordertype.type";

export class OrderAlternative {
    id: string;
    dateOrder: Date;
    numberOrder: number;
    order_type: OrderType
    orderItem: {
        homologate: string
        of_menu: boolean
        categoryOrderItem: {
            description: string;
        },
        fk_revenue?: string,
        amountItem: number;
        dateOrderItem: Date;
        revenues: {
            description: string;
            imagem: string;
        },
        valueOrderItem: number
    }[];
    valueOrder: number;
    orderStatus: {
        description: string,
    }
}
