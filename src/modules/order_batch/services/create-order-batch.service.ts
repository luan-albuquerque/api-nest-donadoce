import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RevenuesRepository } from 'src/modules/revenue/repository/contract/RevenuesRepository';
import { CategoryOrderItemRepository } from 'src/modules/category_order_items/repository/contract/CategoryOrderItemRepository';
import { RevenuePerClientRepository } from 'src/modules/revenue-per-client/repository/contract/RevenuePerClientRepository';
import { OrderBatchRepository } from '../repository/contract/OrderBatchRepository';
import { OrderRepository } from 'src/modules/order/repository/contract/OrderRepository';
import { CreateOrderBatch } from '../dto/create_order_batch.dto';
import { Order } from 'src/modules/order/entities/order.entity';
import * as fs from 'fs/promises';
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';

@Injectable()
export class CreateOrderBatchService {

  constructor(
    private readonly orderBatchRepository: OrderBatchRepository,
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
  ) { }


  async execute(createOrderBatch: CreateOrderBatch) {

    const userClient = await this.userRepository.finInforUser(createOrderBatch.fk_user);

    if (!userClient) {
      throw new NotFoundException(`Cliente não encontrado`)
    }

    const orderAll: Order[] = await this.orderRepository.findManyNotFilter();

    var fk_company = "";
    await Promise.all(
      createOrderBatch.createOrderBatchItem.map(async (item) => {
        var orderAlReadyExist = orderAll.find((order) => order.id === item.fk_order);

        if (!orderAlReadyExist) {
          if (createOrderBatch?.file_invoice_absolute) {
            this.deleteFile(createOrderBatch.file_invoice_absolute);
          }

          throw new NotFoundException('Pedido ' + item.fk_order + ' não encontrado.')
        }
        if (fk_company != "" && fk_company != orderAlReadyExist.fk_company) {
          throw new NotFoundException('Pedido contém responsaveis diferente no pedido ' + orderAlReadyExist.numberOrder)
        }

        fk_company = orderAlReadyExist.fk_company;

        var orderSem = await this.orderRepository.findOrderUtilizetedInOrderBatch(item.fk_order);
        var orderFK = await this.orderRepository.findById(item.fk_order);

        if (orderFK) {

          if (orderFK.fk_orderstatus != "1c69c120002-575f34-1c69-be56-0242ac1201c69" &&
            orderFK.fk_orderstatus != "016b9c84-4e7f-81ee-be56-0242ac1200022fe2af" &&
            orderFK.fk_orderstatus != "789850813-1c69-11ee-be56-c691200020241") {

            if (createOrderBatch?.file_invoice_absolute) {
              this.deleteFile(createOrderBatch.file_invoice_absolute);
            }
            throw new BadRequestException("Para adicionar nota fiscal o pedido deve está com staus 'Revisão Admin' ou 'Entregue' Erro: " + orderFK.numberOrder)
          }
        }
        else {
          throw new BadRequestException("Pedido não encontrado. Erro: Id não encontrado " + item.fk_order)

        }

        if (orderSem) {

          if (createOrderBatch?.file_invoice_absolute) {
            this.deleteFile(createOrderBatch.file_invoice_absolute);
          }

          throw new BadRequestException('Pedido possivelmente está vinculado a um lote - fk_order: ' + item.fk_order);

        }
      })
    )

    createOrderBatch.fk_company = fk_company;


    try {
      await this.orderBatchRepository.create(createOrderBatch).then(async () => {
         createOrderBatch.createOrderBatchItem.map(async (item) => {
           await this.orderRepository.addInvoiceInOrder(item.fk_order, createOrderBatch.file_invoice, createOrderBatch.invoice_number);
         })
      });
    } catch (error) {
      throw new BadRequestException(error);
    }

  }


  async deleteFile(path_absolute: string) {
    if (path_absolute == null) return;

    fs.access(path_absolute).then(() => {
      fs.unlink(path_absolute)

    })
  }


}

