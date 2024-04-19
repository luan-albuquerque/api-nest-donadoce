import { ApiProperty } from "@nestjs/swagger"

export class ListExportFaturamentoDTO {
    @ApiProperty()
    orderStatus?: string

    @ApiProperty()
    orderType?: string

    @ApiProperty()
    client?: string
    
    @ApiProperty()
    dataInicial?: Date

    @ApiProperty()
    dataFinal?: Date
}