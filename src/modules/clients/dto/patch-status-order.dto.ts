import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PatchStatusOrderDTO {
    
    @IsString({ message: 'Esta variável de fk_order_Status precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de fk_order_Status não pode esvaziar' })
    @ApiProperty()
    fk_order_Status: string

    @IsString({ message: 'Esta variável de comment precisa ser string' })
    @ApiProperty()
    comment?: string
}