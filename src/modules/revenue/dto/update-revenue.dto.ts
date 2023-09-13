import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRevenueDto } from './create-revenue.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { OrderType } from 'src/modules/order/types/ordertype.type';
import { StatusRevenue } from '../enum/statusRevenue.enum';

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

    order_type?: OrderType
    
    @IsNumber()
    @Type(()=> Number)
    @ApiProperty({required: false})
    time_in_hours?: number

    @ApiProperty({type: 'number'})
    @Transform(({ value }) => Number(value))
    @IsEnum(StatusRevenue,{message: 'Status precisa ser 0 ou 1'})
    @IsNotEmpty ({message:'status não pode ser vazio'})
    status: number

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
