import { CreateClientDto } from "../../dto/create-client.dto";
import { PaginationOptions } from "../../dto/pagination-options.dto";
import { UpdateClientDto } from "../../dto/update-client.dto";
import { Client } from "../../entities/client.entity";


export abstract class ClientsRepository {
    abstract create(createClientDto: CreateClientDto):Promise<Client>
    abstract findByCNPJ(cnpj: string):Promise<Client>
    abstract findByFone(fone: string):Promise<Client>
    abstract findById(id: string):Promise<Client>
    abstract findByIE(Ie: string):Promise<Client>
    abstract remove(id: string):Promise<void>
    abstract findByAll(pagination?: PaginationOptions):Promise<Client[]>
    abstract update(id: string,updateClientDto: UpdateClientDto): Promise<void>


}