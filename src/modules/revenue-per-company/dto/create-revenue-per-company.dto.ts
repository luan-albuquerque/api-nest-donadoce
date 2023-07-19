import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRevenuePerCompanyStatusDTO {
    @IsString({ message: 'Campo de fk_revenue precisa ser string' })
    @IsNotEmpty({ message: 'Campo de fk_revenue não pode ser vazio' })
    @ApiProperty()
    fk_revenue: string;

    @IsString({ message: 'Campo de fk_company precisa ser string' })
    @IsNotEmpty({ message: 'Campo de fk_company não pode ser vazio' })
    @ApiProperty()
    fk_company: string;

    @IsNumber()
    @IsNotEmpty({ message: 'Campo de unique_value não pode ser vazio' })
    @ApiProperty()
    unique_value: number
}