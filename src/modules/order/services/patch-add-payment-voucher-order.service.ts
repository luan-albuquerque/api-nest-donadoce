import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { GenerateLogs } from 'src/shared/exception/GenerateLogs.exception';
import * as fs from 'fs/promises';


@Injectable()
export class PatchAddPaymentVoucherOrderService {

    constructor(
        private readonly orderRepository: OrderRepository
    ) { }

    async execute(fk_user: string, id: string, file: string, file_path: string) {

        try {

            const order = await this.orderRepository.findById(id)

            if (!order) {
                this.deleteFile(file_path);
                throw new NotFoundException("Pedido não encontrado")
            }

            if (order.fk_user != fk_user) {
                throw new BadRequestException("Para adicionar o comprovante o usuario deve ser o mesmo que solicitou o pedido")
            }


            if (order.fk_orderstatus == "fer762d-erjr345d4s5f-dfkj3kd-39dsu49dshn3") {
                throw new BadRequestException("Pedido ja foi finalizado")

            }

            if (order.fk_orderstatus != "22afa4e4-4e7f-14ee-be56-0222afa2d22afb092") {
                throw new BadRequestException("Pedido precisa está com status 'Revisão Cliente'")
            }

            if (order.file_payment_voucher) {
                this.deleteFile(file_path);
                throw new BadRequestException("Pedido ja possui cautela")
            }

            await this.orderRepository.addPaymentVoucherInOrder(id, file);

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

