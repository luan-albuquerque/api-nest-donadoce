import { Injectable, NotFoundException } from "@nestjs/common";
import { MenuRepository } from "../repository/contract/MenuRepository";
import { Menu } from "../entities/menu.entity";

@Injectable()
export class FindOneMenuService {

    constructor(
        private readonly menuRepository: MenuRepository
    ) { }
    async execute(id: string): Promise<Menu> {

        const verify = await this.menuRepository.findOne(id)

        if (!verify) {
            throw new NotFoundException("Menu não encontrado")

        }

        return verify;

    }

}