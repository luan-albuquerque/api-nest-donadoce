import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RevenuesRepository } from '../repository/contract/RevenuesRepository';
import { UpdateRevenueDto } from '../dto/update-revenue.dto';

@Injectable()
export class UpdateRevenueService {
    constructor(
        private readonly revenuesRepository: RevenuesRepository,
    ) { }

    async execute(id: string, updateRevenueDto: UpdateRevenueDto) {
     
        updateRevenueDto.description = updateRevenueDto.description.toUpperCase()
        
        const revenue = await this.revenuesRepository.findByOne(id)

        if (!revenue) {
            throw new UnauthorizedException("Receita não encontrada")
        }

        const revenueNewAtu = await this.revenuesRepository.findByDescription(updateRevenueDto.description)

        if (revenueNewAtu && updateRevenueDto.description != revenue.description) {
            throw new UnauthorizedException("Descrição já existente em outra receita")
        }
        
        let newimagen = null
        // Se a descrição de imagem for a mesma que a salva no banco, a variavel recebe
        // Caso os bomes sejam diferente
        if(updateRevenueDto.old_imagem == revenue.imagem){
            newimagen = revenue.imagem
        }
        // Se a exisir uma nova imagem a variavel sobrescreve a old
        if(updateRevenueDto.imagem != null){
            newimagen = updateRevenueDto.imagem 
        }
        
        await this.revenuesRepository.update(id, {
            description: updateRevenueDto.description,
            value: updateRevenueDto.value,
            imagem: newimagen,
            old_imagem: null,
            presumed_profit: updateRevenueDto.presumed_profit,
            time_in_hours: updateRevenueDto.time_in_hours,
            yield_per_quantity: updateRevenueDto.yield_per_quantity
        })


    }
}
