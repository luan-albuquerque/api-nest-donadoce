import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddPaymentVoucherInOrder {
    @ApiProperty({ type: 'string', format: 'binary', required: false })
    file_payment_voucher?: string

 

    

}

