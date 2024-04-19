import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddInvoiceInOrder {
    @ApiProperty({ type: 'string', format: 'binary', required: false })
    file_invoice?: string

    @ApiProperty()
    number_invoice?: string

    

}

