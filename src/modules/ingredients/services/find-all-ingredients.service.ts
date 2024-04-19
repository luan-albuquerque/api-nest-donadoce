import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from '../repository/contract/IngredientsRepository';
import { PaginationOptions } from '../dto/pagination-options.dto';

@Injectable()
export class FindAllIngredientsService {
    
  constructor(private readonly ingredientsRepository:IngredientsRepository){}

  async execute(data: PaginationOptions) {
    return await this.ingredientsRepository.list(data)
  }
}
