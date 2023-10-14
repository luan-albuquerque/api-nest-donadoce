import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { GenerateLogs } from 'src/shared/exception/GenerateLogs.exception';
import * as fs from 'fs/promises';


@Injectable()
export class PatchAddCautionOrderService {

    constructor(
        private readonly orderRepository: OrderRepository
    ) { }

    async execute(id: string, file: string, file_path: string) {

        try {

            const order = await this.orderRepository.findById(id)
            if (!order) {
                this.deleteFile(file_path);
                throw new NotFoundException("Pedido não encontrado")
            }

            if (
                order.fk_orderstatus == "1c69c120002-575f34-1c69-be56-0242ac1201c69" || 
                order.fk_orderstatus == "016b9c84-4e7f-81ee-be56-0242ac1200022fe2af" ||
                order.fk_orderstatus == "789850813-1c69-11ee-be56-c691200020241"
            )
                 {
                this.deleteFile(file_path);
                throw new NotFoundException("Pedido não pode ter cautela adicionado pois não está 'em processamento'")
            }

            await this.orderRepository.addCautionInOrder(id, file);

        } catch (error) {
            await GenerateLogs.generate(error)
            throw new InternalServerErrorException(error)
        }

    }

    
  async deleteFile(path_absolute: string) {
    fs.access(path_absolute).then(() => {
      fs.unlink(path_absolute)
    })
  }

}

