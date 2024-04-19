import { OrderType } from "../types/ordertype.type";

export class OrderAlternative {
    id: string;
    dateOrder: Date;
    numberOrder: number;
    order_type: OrderType;
    is_created_by_company?: boolean;
    orderItem: {
        homologate: string
        of_menu: boolean,
        comment?: string,
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
