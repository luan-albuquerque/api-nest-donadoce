import { CreateCompanyDto } from "../../dto/create-company.dto";
import { UpdateCompanyDto } from "../../dto/update-company.dto";
import { Company } from "../../entities/company.entity";

export abstract class CompanyRepository {
    abstract create(createCompanyDto: CreateCompanyDto):Promise<void>
    abstract findById(id: string):Promise<Company>
    abstract findByCNPJByClient(cnpj: string, fk_clients: string): Promise<Company>
    abstract findByEmailByClient(email: string, fk_clients: string): Promise<Company>
    abstract findAll(): Promise<Company[]>
    abstract update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<void>
    abstract remove(id: string): Promise<void>
}