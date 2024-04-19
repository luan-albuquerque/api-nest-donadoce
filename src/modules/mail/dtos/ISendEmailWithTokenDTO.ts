import { User } from "src/modules/users/entities/user.entity";

export default interface ISendEmailWithTokenDTO {
    user: User,
    token: string
    
}