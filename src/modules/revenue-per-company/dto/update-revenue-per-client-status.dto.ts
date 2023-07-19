import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateRevenuePerClientStatusDTO {
    @IsString({ message: 'Campo de fk_revenue precisa ser string' })
    @IsNotEmpty({ message: 'Campo de fk_revenue não pode ser vazio' })
    @ApiProperty()
    fk_revenue: string;

    @IsString({ message: 'Campo de fk_client precisa ser string' })
    @IsNotEmpty({ message: 'Campo de fk_client não pode ser vazio' })
    @ApiProperty()
    fk_client: string;

    @IsNumber()
    @IsNotEmpty({ message: 'Campo de unique_value não pode ser vazio' })
    @ApiProperty()
    unique_value: number
}