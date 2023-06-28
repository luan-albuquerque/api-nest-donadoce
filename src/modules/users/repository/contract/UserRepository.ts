import { CreateUserDto } from "../../dto/create-user.dto";
import { PaginationOptions } from "../../dto/pagination-options.dto";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { User } from "../../entities/user.entity";

export abstract class UserRepository {
    abstract findByMail(email: string):Promise<User>
    abstract findById(id: string):Promise<User>
    abstract remove(id: string):Promise<void>
    abstract updatePassword(id: string, password: string):Promise<void>


}