import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString , IsPostalCode, IsPhoneNumber, IsEmail, IsBtcAddress, IsNumber } from "class-validator"

export class PatchPriorityCompanyDTO {
    

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: 'Prioridade não pode ser vazio' })
    priority: number


}
