import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class DeleteClientCompany {
    @IsString({ message: 'Esta variável de fk_client precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de fk_client não pode esvaziar' })
    @ApiProperty()
    fk_client: string

    @IsString({ message: 'Esta variável de fk_company precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de fk_company não pode esvaziar' })
    @ApiProperty()
    fk_company: string


}