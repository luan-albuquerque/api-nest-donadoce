import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../repository/contract/UserRepository";
import { UpdatePasswordUserDto } from "../dto/update-password-user.dto";

import BCryptHashPassword from "src/modules/auth/providers/Hash/implementations/BCryptHashPassword";

@Injectable()
export class UpdatePasswordService { 

    constructor(
        private readonly userRepository: UserRepository,
        @Inject(BCryptHashPassword)
        private readonly hashPassword: IHashPasswordContract,
    ){}

  async execute(id: string, body: UpdatePasswordUserDto){

    const user = await this.userRepository.findById(id)
    if (!user) {
        throw new UnauthorizedException(
            "Usuario não existe"
        )
    }

    const comparePass = await this.hashPassword.compareHash(body.password_old, user.password)

    if (!comparePass) {
        throw new UnauthorizedException(
            "Senha antiga invalida"
        )
    }

    if (body.password != body.password_confirm) {
        throw new UnauthorizedException(
            "Senhas não são iguais."
        )
    }
    const passwordHash: string = await this.hashPassword.generateHash(body.password)


     await this.userRepository.updatePassword(user.id, passwordHash);

  } 

}