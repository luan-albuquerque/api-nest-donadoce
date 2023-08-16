export class OrderAlternative {
    id: string;
    dateOrder: Date;
    numberOrder: number;

    orderItem: {
        homologate: string
        of_menu: boolean
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
