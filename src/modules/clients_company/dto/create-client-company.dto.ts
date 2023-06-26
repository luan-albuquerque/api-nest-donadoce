import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateClientCompany {
    @IsString({ message: 'Esta variável de fk_client precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de fk_client não pode esvaziar' })
    @ApiProperty()
    fk_client: string

    @IsString({ message: 'Esta variável de fk_company precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de fk_company não pode esvaziar' })
    @ApiProperty()
    fk_company: string

    @IsString({ message: 'Esta variável de fone precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de fone não pode esvaziar' })
    @ApiProperty()
    fone: string

    @IsString({ message: 'Esta variável de accountable precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de accountable não pode esvaziar' })
    @ApiProperty()
    accountable: string
}