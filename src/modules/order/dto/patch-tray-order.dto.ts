import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty } from "class-validator"

export class PatchTrayOrderDto {
    @IsInt()
    @IsNotEmpty({ message: 'Variável fk_revenue não pode esvaziar' })
    @ApiProperty()
     amount_of_tray: number
  
}
