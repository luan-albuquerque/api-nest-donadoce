import { CreateUserDto } from "../../dto/create-user.dto";
import { PaginationOptions } from "../../dto/pagination-options.dto";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { User } from "../../entities/user.entity";

export abstract class UserRepository {
    abstract create(createUserDto: CreateUserDto): Promise<User>
    abstract update(id: string, updateUserDto: UpdateUserDto): Promise<User>
    abstract findByMail(email: string):Promise<User>
    abstract findById(id: string):Promise<User>
    abstract finInforUser(id: string):Promise<User>
    abstract remove(id: string):Promise<void>
    abstract updatePassword(id: string, password: string):Promise<void>

    abstract listUserToOrderBatch():Promise<User[]>
    


}