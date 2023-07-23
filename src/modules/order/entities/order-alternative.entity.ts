export class OrderAlternative {
    id: string;
    dateOrder: Date;
    numberOrder: number;
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
