import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRevenueDto } from './create-revenue.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRevenueDto  {
    @IsString({ message: 'Descrição precisa ser string' })
    @IsNotEmpty({ message: 'Descrição não pode esvaziar' })
    @ApiProperty()
    description: string

    @ApiProperty()
    @IsNumber()
    @Type(()=> Number)
    @IsNotEmpty({ message: 'Valor não pode ser vazio' })
    value: number

    @ApiProperty({required: false})
    @IsNumber()
    @Type(()=> Number)
    yield_per_quantity?: number

    @ApiProperty({required: false})
    @IsNumber()
    @Type(()=> Number)
    base_max_amount?: number

    @ApiProperty({required: false})
    @IsNumber()
    @Type(()=> Number)
    base_min_amount?: number
    
    @IsNumber()
    @Type(()=> Number)
    @ApiProperty({required: false})
    time_in_hours?: number

    @IsNumber()
    @Type(()=> Number)
    @ApiProperty({required: false})
    presumed_profit?: number

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    imagem?: string
    @IsString({ message: 'old_imagem precisa ser string' })
    @ApiProperty({ required: false})
    old_imagem?: string
}
