import { CreateUserDto } from "../dto/create-user.dto";
import { PaginationOptions } from "../dto/pagination-options.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

export abstract class UserRepository {
    abstract findByMail(email: string):Promise<User>
    // abstract findByUsername(username: string):Promise<User>
    abstract findById(id: string):Promise<User>
    // abstract findByCpf(cpf: string):Promise<User>
    abstract create(createUserDto: CreateUserDto):Promise<void>
    abstract update(id: string, updateUserDto: UpdateUserDto):Promise<void>
    abstract updatePassword(id: string, password: string):Promise<void>
    abstract list( data :PaginationOptions):Promise<User[]>

}