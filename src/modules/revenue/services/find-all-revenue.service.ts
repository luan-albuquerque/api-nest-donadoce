import { Injectable } from '@nestjs/common';
import { RevenuesRepository } from '../repository/contract/RevenuesRepository';

@Injectable()
export class FindAllRevenueService {

    constructor(
        private readonly revenuesRepository: RevenuesRepository,
    ) { }

    async execute(){
        return await this.revenuesRepository.findByAll()
    }

}