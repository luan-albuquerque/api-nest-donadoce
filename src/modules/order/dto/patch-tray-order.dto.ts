import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty } from "class-validator"

export class PatchTrayOrderDto {
    @IsInt()
    @IsNotEmpty({ message: 'Variável amount_of_tray não pode esvaziar' })
    @ApiProperty()
     amount_of_tray: number

     @IsInt()
     @IsNotEmpty({ message: 'Variável amount_of_boxes não pode esvaziar' })
     @ApiProperty()
     amount_of_boxes: number
  
}
