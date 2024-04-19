import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Unit_of_measurement } from "../types/Unit-of-measurement.types";




export class CreateIngredientControlDto {
    @IsString({ message: 'Esta fk_ingredient de nome precisa ser string' })
    @IsNotEmpty({ message: 'Esta fk_ingredient de nome não pode esvaziar' })
    @ApiProperty()
    fk_ingredient: string;

    @IsNotEmpty({ message: 'Esta fk_ingredient de nome não pode esvaziar' })
    @IsNumber()
    @ApiProperty()
    amount: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Esta fk_ingredient de nome não pode esvaziar' })
    @ApiProperty()
    unitary_value: number;

    unit_of_measurement?: Unit_of_measurement

    @IsNotEmpty({ message: 'Esta fk_ingredient de nome não pode esvaziar' })
    @ApiProperty()
    is_output: boolean;
}
