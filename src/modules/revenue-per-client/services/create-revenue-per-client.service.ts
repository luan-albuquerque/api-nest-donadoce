import { Injectable, BadRequestException , UnauthorizedException } from '@nestjs/common';
import { CreateRevenuePerClientStatusDTO } from '../dto/create-revenue-per-client.dto';
import { RevenuePerClientRepository } from '../repository/contract/RevenuePerClientRepository';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';

@Injectable()
export class CreateRevenuePerClientService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly revenuesRepository: RevenuesRepository,
        private readonly revenuePerClientRepository: RevenuePerClientRepository
    ) { }

    async execute({ fk_client, fk_revenue, unique_value }: CreateRevenuePerClientStatusDTO) {

        const revenuePerCompany = await this.revenuePerClientRepository.findOne(fk_revenue, fk_client)
   
        const revenue = await this.revenuesRepository.findByOne(fk_revenue)
        const user = await this.userRepository.findById(fk_client)

        
        if (!user) {
            throw new UnauthorizedException("User não encontrada")
        }

        if (!revenue) {
            throw new UnauthorizedException("Receita não encontrada")
        }

        await this.revenuePerClientRepository.create({
            fk_client,
            fk_revenue,
            unique_value
        })

    }
}
