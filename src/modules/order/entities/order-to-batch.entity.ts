import { OrderType } from "../types/ordertype.type";

export class OrderToBatchDTO {
    id: string;
    dateOrder: Date;
    numberOrder: number;
    order_type: OrderType;
    user: {
        Clients: {
            corporate_name: string
        }
    };
    orderBatchItem: {
        orderBatch: {
            file_invoice: string,
            file_payment_voucher: string,
            fk_client: string,
            fk_user_open_orderbatch: string,
            invoice_number: string,
            numberOrderBatch: number,
            user: {
                Clients: {
                    corporate_name: string,

                }
            },
            userBatch: {
                Clients: {
                    corporate_name: string,
                }
            }
        }
    };
    // orderItem: {
    //     homologate: string
    //     of_menu: boolean
    //     method_of_preparation: any,
    //     delivery_date: Date,
    //     categoryOrderItem: {
    //         description: string;
    //         time: Date
    //     },
    //     amountItem: number;
    //     dateOrderItem: Date;
    //     revenues: {
    //         description: string;
    //         imagem: string;
    //     },
    //     valueOrderItem: number
    // }[];
    valueOrder: number;
    orderStatus: {
        description: string,
    }
}
