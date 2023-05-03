import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

export abstract class UserRepository {
    abstract findByMail(email: string):Promise<User>
    abstract findById(register: string):Promise<User>
    abstract findByCpf(cpf: string):Promise<User>
    abstract create(createUserDto: CreateUserDto):Promise<void>
    abstract list():Promise<User[]>

}