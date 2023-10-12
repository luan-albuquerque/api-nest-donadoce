import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { GenerateLogs } from 'src/shared/exception/GenerateLogs.exception';
import * as fs from 'fs/promises';


@Injectable()
export class PatchAddInvoiceOrderService {

    constructor(
        private readonly orderRepository: OrderRepository
    ) { }

    async execute(id: string, file: string, file_path: string, number_invoice: string) {

        try {

            const order = await this.orderRepository.findById(id)

            if (!order) {
                this.deleteFile(file_path);
                throw new NotFoundException("Pedido não encontrado")
            }

            if(!order.file_invoice != null && order.fk_orderstatus != "1c69c120002-575f34-1c69-be56-0242ac1201c69"){
                throw new BadRequestException("Operação não permitida Erro: Pedido ja possui uma nota fiscal vinculada e não está no status 'Revisão Admin'")                 
            }

            if(order.fk_orderstatus == "fer762d-erjr345d4s5f-dfkj3kd-39dsu49dshn3"){
                throw new BadRequestException("Pedido ja foi finalizado")

            }

            if (order.fk_orderstatus == "1c69c120002-575f34-1c69-be56-0242ac1201c69" || order.fk_orderstatus == "016b9c84-4e7f-81ee-be56-0242ac1200022fe2af") {
                this.deleteFile(file_path);
                throw new BadRequestException("Para adicionar nota fiscal o pedido deve está com staus 'Revisão Admin' ou 'Entregue'")
            }

            if (order.file_invoice) {
                this.deleteFile(file_path);
                throw new BadRequestException("Pedido ja possui cautela")
            }

           await this.orderRepository.addInvoiceInOrder(id, file, number_invoice);

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

