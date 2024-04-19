import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RevenuePerClientRepository } from '../repository/contract/RevenuePerClientRepository';
import { FiltersRevenuePerClientDTO } from '../dto/filters-revenue-per-client.dto';
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';

@Injectable()
export class FindOneRevenuePerClientService {
    constructor(
        private readonly revenuePerClientRepository: RevenuePerClientRepository,
        private readonly userRepository: UserRepository,

    ) { }

    async execute(fk_client: string, skip: number, take: number){

        const user = await this.userRepository.findById(fk_client)

        if (!user) {
            throw new UnauthorizedException("Cliente não encontrada")
        }
        return await this.revenuePerClientRepository.findRevenuesByClient(fk_client, skip, take);

    }

}
