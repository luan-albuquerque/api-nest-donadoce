import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyRepository } from '../repository/contract/CompanyRepository';
import { ClientsRepository } from 'src/modules/clients/repository/contract/ClientsRepository';
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';

@Injectable()
export class CreateCompanyService {

  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly clientsRepository: ClientsRepository,
    private readonly userRepository: UserRepository,
  ) { }

  async execute(createCompanyDto: CreateCompanyDto) {

    const findByEmail = await this.companyRepository.findByEmail(createCompanyDto.email);
    if (!findByEmail) {
      throw new NotFoundException("Email já Existe")
    }

    
    const emailClient = await this.userRepository.findByMail(createCompanyDto.email);
    if (emailClient) {
      throw new NotFoundException(`Este email: ${createCompanyDto.email} está sendo utilizado por um cliente`)
    }

    const findByCNPJ = await this.companyRepository.findByCNPJ(createCompanyDto.cnpj);
    if (findByCNPJ) {
      throw new NotFoundException("CNPJ já Existe.")
    }
    const findByCNPJInClinte = await this.clientsRepository.findByCNPJ(createCompanyDto.cnpj);
    if (findByCNPJInClinte) {
      throw new NotFoundException("CNPJ utilizado por um cliente.")
    }

    const findByIE = await this.companyRepository.findByIE(createCompanyDto.ie);
    if (findByIE) {
      throw new NotFoundException("Inscrição Estadual já Existe.")
    }

    const findByIEInCliente = await this.clientsRepository.findByIE(createCompanyDto.ie);
    if (findByIEInCliente) {
      throw new NotFoundException("Inscrição Estadual utilizada por um cliente.")
    }

    const findByFone = await this.companyRepository.findByFone(createCompanyDto.fone);
    if (findByFone) {
      throw new NotFoundException("Fone já Existe.")
    }

    const findByFoneInCliente = await this.clientsRepository.findByFone(createCompanyDto.fone);
    if (findByFoneInCliente) {
      throw new NotFoundException("Fone sendo utilizado por um cliente.")
    }

    const create: CreateCompanyDto = {
      corporate_name: createCompanyDto.corporate_name,
      address: createCompanyDto.address,
      cep: createCompanyDto.cep,
      cnpj: createCompanyDto.cnpj,
      county: createCompanyDto.cep,
      email: createCompanyDto.email,
      accountable: createCompanyDto.accountable,
      district: createCompanyDto.district,
      ie: createCompanyDto.ie,
      uf: createCompanyDto.uf,
      fone: createCompanyDto.fone,
    }


    await this.companyRepository.create(create)



  }

}
