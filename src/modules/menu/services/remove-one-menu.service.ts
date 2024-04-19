import { Injectable, NotFoundException } from "@nestjs/common";
import { MenuRepository } from "../repository/contract/MenuRepository";

@Injectable()
export class RemoveOneMenuService {

    constructor(
        private readonly menuRepository: MenuRepository
    ) { }
    async execute(id: string): Promise<void> {

        const verify = await this.menuRepository.findOne(id)

        if (!verify) {
            throw new NotFoundException("Menu não encontrado")

        }

        await this.menuRepository.updateStatus(id)


    }

}