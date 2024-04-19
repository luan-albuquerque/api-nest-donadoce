import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length, Max } from "class-validator";
import { CreateClientCompany } from "src/modules/clients_company/dto/create-client-company.dto";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";


// class CreateCompany {
//     @IsString({ message: 'Esta variável de fk_company precisa ser string' })
//     @IsNotEmpty({ message: 'Esta variável de fk_company não pode esvaziar' })
//     @ApiProperty()
//     fk_company: string

//     @IsString({ message: 'Esta variável de fone precisa ser string' })
//     @IsNotEmpty({ message: 'Esta variável de fone não pode esvaziar' })
//     @ApiProperty()
//     fone: string

//     @IsString({ message: 'Esta variável de accountable precisa ser string' })
//     @IsNotEmpty({ message: 'Esta variável de accountable não pode esvaziar' })
//     @ApiProperty()
//     accountable: string

//     @IsString({ message: 'Esta variável de email precisa ser string' })
//     @IsNotEmpty({ message: 'Esta variável de email não pode esvaziar' })
//     @ApiProperty()
//     email: string
// }
export class CreateClientDto {
    @IsString({ message: 'Esta variável de corporate_name precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de corporate_name não pode esvaziar' })
    @ApiProperty()
    corporate_name: string

    @IsString({ message: 'Esta variável de cnpj precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de cnpj não pode esvaziar' })
    @ApiProperty()
    cnpj: string

    @ApiProperty({required: false})
    fone?: string

    @IsString({ message: 'Esta variável de name_fantasy precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de name_fantasy não pode esvaziar' })
    @ApiProperty()
    name_fantasy: string

    @IsString({ message: 'Esta variável de county precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de county não pode esvaziar' })
    @ApiProperty()
    county: string

    @IsString({ message: 'Esta variável de district precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de district não pode esvaziar' })
    @ApiProperty()
    district: string

    @IsString({ message: 'Esta variável de ie precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de ie não pode esvaziar' })
    @ApiProperty()
    ie: string

    @IsString({ message: 'Esta variável de uf precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de uf não pode esvaziar' })
    @Length(2,2,{message: "UF deve conter dois caracterís representando um estado"})
    @ApiProperty()
    uf: string
   
    @IsString({ message: 'Esta variável de address precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de address não pode esvaziar' })
    @ApiProperty()
    address: string

    @IsString({ message: 'Esta variável de cep precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de cep não pode esvaziar' })
    @ApiProperty()
    cep: string

    
    @IsString({ message: 'Esta variável de accountable precisa ser string' })
    @IsNotEmpty({ message: 'Esta variável de accountable não pode esvaziar' })
    @ApiProperty()
    accountable: string

    
    // @ApiProperty({
    //     required: true,
    //     type: 'object',
    //     items: {
    //       example:{
    //         password : "string",
    //         email: "string",
    //         is_enabled: "boolean",
    //         is_admin: "boolean",
    //         is_client: "boolean",
    //       },
    //       properties: {
    //         password : { type: 'string' },
    //         email: { type: 'string' },
    //         is_enabled: { type: 'boolean' },
    //         is_admin: { type: 'boolean' },
    //         is_client: { type: 'boolean' }
    //       },
    //     },
    //   })
    @ApiProperty({ type: CreateUserDto})
    @Type(()=> CreateUserDto)
    createUser: CreateUserDto

    @ApiProperty({ type: CreateClientCompany, isArray:true})
    // @Type(()=> CreateCompany)
    createCompany: CreateClientCompany[]

    
}
