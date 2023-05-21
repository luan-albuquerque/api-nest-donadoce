import { Injectable } from '@nestjs/common';
import { CreateRevenueDto } from '../dto/create-revenue.dto';
import { UpdateRevenueDto } from '../dto/update-revenue.dto';


@Injectable()
export class RevenueService {

  findAll() {
    return `This action returns all revenue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} revenue`;
  }

  update(id: number, updateRevenueDto: UpdateRevenueDto) {
    return `This action updates a #${id} revenue`;
  }

  remove(id: number) {
    return `This action removes a #${id} revenue`;
  }
}
