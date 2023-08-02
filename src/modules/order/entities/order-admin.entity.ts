export class OrderAdmin {
    id: string;
    dateOrder: Date;
    numberOrder: number;
    user: {
        Clients: {
            corporate_name: string
        }
    }
    orderItem: {
        categoryOrderItem: {
            description: string;
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