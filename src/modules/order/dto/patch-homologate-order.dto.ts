import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class PatchHomologateOrder {
    @IsString({ message: 'Variável fk_categoryOrderItem precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_categoryOrderItem não pode esvaziar' })
    @ApiProperty()
    fk_categoryOrderItem: string
    
    @IsString({ message: 'Variável fk_order precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_order não pode esvaziar' })
    @ApiProperty()
    fk_order: string

    @IsString({ message: 'Variável fk_revenue precisa ser string' })
    @IsNotEmpty({ message: 'Variável fk_revenue não pode esvaziar' })
    @ApiProperty()
    fk_revenue: string

    @IsString({ message: 'Variável homologate precisa ser string' })
    @IsNotEmpty({ message: 'Variável homologate não pode esvaziar' })
    @ApiProperty()
    homologate?: any;

}
