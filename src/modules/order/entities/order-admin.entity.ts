import { OrderType } from "../types/ordertype.type";

export class OrderAdmin {
    id: string;
    dateOrder: Date;
    numberOrder: number;
    order_type: OrderType
    user: {
        Clients: {
            corporate_name: string
        }
    }

    orderItem: {
        homologate: string
        of_menu: boolean
        method_of_preparation: any,
        delivery_date: Date,
        categoryOrderItem: {
            description: string;
            time: Date
        },
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
