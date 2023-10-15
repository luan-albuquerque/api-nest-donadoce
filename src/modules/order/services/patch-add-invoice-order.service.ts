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
                throw new NotFoundException("Pedido não encontrado")
            }


            if (order.fk_orderstatus == "fer762d-erjr345d4s5f-dfkj3kd-39dsu49dshn3") {
                throw new BadRequestException("Pedido ja foi finalizado")

            }

            if (
                order.fk_orderstatus == "1c69c120002-575f34-1c69-be56-0242ac1201c69" ||
                order.fk_orderstatus == "016b9c84-4e7f-81ee-be56-0242ac1200022fe2af" ||
                order.fk_orderstatus == "789850813-1c69-11ee-be56-c691200020241"

            ) {
                await this.orderRepository.addInvoiceInOrder(id, file, number_invoice);

            } else {
                throw new BadRequestException("Para adicionar nota fiscal o pedido deve está com staus 'Revisão Admin', 'Em entrega' ou 'Entregue'")

            }



        } catch (error) {
            this.deleteFile(file_path);
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

