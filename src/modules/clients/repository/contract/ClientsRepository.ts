import { CreateClientDto } from "../../dto/create-client.dto";
import { Client } from "../../entities/client.entity";


export abstract class ClientsRepository {
    abstract create(createClientDto: CreateClientDto):Promise<void>
    abstract findByCNPJ(cnpj: string):Promise<Client>
    abstract findById(id: string):Promise<Client>
    abstract findByAll():Promise<Client[]>

}