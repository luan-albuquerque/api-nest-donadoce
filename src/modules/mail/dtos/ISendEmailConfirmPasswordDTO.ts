import { User } from "src/modules/users/entities/user.entity";

export default interface ISendEmailConfirmPasswordDTO {
    user: User
}