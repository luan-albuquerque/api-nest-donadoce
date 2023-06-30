import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyRepository } from '../repository/contract/CompanyRepository';
import { ClientsRepository } from 'src/modules/clients/repository/contract/ClientsRepository';
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';

@Injectable()
export class UpdateCompanyService {

  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly clientsRepository: ClientsRepository,
    private readonly userRepository: UserRepository,
  ){}

  async execute(id: string, updateCompanyDto: UpdateCompanyDto) {
 
  
    const company = await this.companyRepository.findById(id)

    if (!company) {
      throw new HttpException('id não existe', HttpStatus.CONFLICT)
    }

    const findByEmailInUser = await this.userRepository.findByMail(updateCompanyDto.email);
    const findByEmail = await this.companyRepository.findByEmail(updateCompanyDto.email);
    if (findByEmail && updateCompanyDto.email != findByEmail.email || findByEmailInUser) {
      throw new NotFoundException("Email já Existe")
    }

    const findByCNPJInClient = await this.clientsRepository.findByCNPJ(updateCompanyDto.cnpj);
    const findByCNPJ = await this.companyRepository.findByCNPJ(updateCompanyDto.cnpj);
    if (findByCNPJ  && updateCompanyDto.cnpj != findByCNPJ.cnpj || findByCNPJInClient) {
      throw new NotFoundException("CNPJ já Existe.")
    }

    const findByFone = await this.companyRepository.findByFone(updateCompanyDto.fone);
    const findByFoneInClient = await this.clientsRepository.findByFone(updateCompanyDto.fone);
    if (findByFone  && updateCompanyDto.fone != findByFone.fone || findByFoneInClient) {
      throw new NotFoundException("Fone já Existe.")
    }

  
    const create: UpdateCompanyDto = {
      corporate_name: updateCompanyDto.corporate_name,
      address: updateCompanyDto.address,
      cep: updateCompanyDto.cep,
      cnpj: updateCompanyDto.cnpj,
      email: updateCompanyDto.email,
      fone: updateCompanyDto.fone,
      district: updateCompanyDto.district,
      uf: updateCompanyDto.uf,
      county: updateCompanyDto.county
    }


    await this.companyRepository.update(id, create)



  }

}
