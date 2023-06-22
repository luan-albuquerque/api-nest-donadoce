import { CreatePersonDto } from "../../dto/create-person.dto";
import { PaginationOptions } from "../../dto/pagination-options.dto";
import { UpdatePersonDto } from "../../dto/update-person.dto";
import { Person } from "../../entities/person.entity";


export abstract class PersonRepository {
    
    abstract create(createPersonDto: CreatePersonDto): Promise<void>
    abstract update(id: string, updatePersonDto: UpdatePersonDto): Promise<void>
    abstract list(paginationOptions: PaginationOptions): Promise<Person[]>
    abstract findOneById(id: string): Promise<Person>
}