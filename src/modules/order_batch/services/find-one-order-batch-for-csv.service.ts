import { Injectable } from '@nestjs/common';
import { OrderBatchRepository } from '../repository/contract/OrderBatchRepository';
import { OrderBatch } from '../entities/order_batch.entity';
import { createObjectCsvStringifier } from 'csv-writer';
import * as dayjs from 'dayjs';

@Injectable()
export class FindOneOrderBatchForCsvService {
  constructor(
    private readonly orderBatchRepository: OrderBatchRepository
  ) {}

  async execute(id: string) {
    const data = await this.orderBatchRepository.findOneOrderBatchForCsv(id);
    return this.generateCsv(data);
  }

  private generateCsv(data: OrderBatch): string {
    const title = `Numero do Lote: ${data.numberOrderBatch}\n`;
    let valorF: number = 0;

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'Empresa', title: 'Empresa' },
        { id: 'Fabrica', title: 'Fabrica' },
        { id: 'Numero de Pedido', title: 'Numero de Pedido' },
        { id: 'Data de Solicitacao de Pedido', title: 'Data de Solicitacao de Pedido' },
        { id: 'Data de Entrega do Pedido', title: 'Data de Entrega do Pedido' },
        { id: 'Quantidade de Itens', title: 'Quantidade de Itens' },
        { id: 'Descricao de Produto', title: 'Descricao de Produto' },
        { id: 'Valor Unitario', title: 'Valor Unitario' },
        { id: 'Valor Total', title: 'Valor Total' },
      ],
      fieldDelimiter: ';',
      alwaysQuote: true,
    });

    const records = data.OrderBatchItem.flatMap(orderBatchItem => {
      const { order } = orderBatchItem;
      const { numberOrder, company, user } = order;

      return order.orderItem.map(orderItem => {
        const { amountItem, revenues, valueOrderItem } = orderItem;
        const totalValue = amountItem * valueOrderItem;
        valorF += totalValue;
        return {
          "Empresa": (order.is_created_by_company ? user?.Client_Company.clients.corporate_name : user?.Clients.corporate_name),
          "Fabrica": (company.corporate_name),
          'Numero de Pedido': numberOrder,
          'Data de Solicitacao de Pedido': dayjs(order.dateOrder).utc(true).format("YYYY-MM-DDT00:00:00Z"),
          'Data de Entrega do Pedido': dayjs(orderItem.delivery_date).utc(true).format("YYYY-MM-DDT00:00:00Z"),
          'Quantidade de Itens': amountItem,
          'Descricao de Produto': revenues.description,
          'Valor Unitario': valueOrderItem.toFixed(2), // Ensure two decimal places
          'Valor Total': totalValue.toFixed(2), // Ensure two decimal places
        };
      });
    });

    const footer = `Total do Lote: ; ; ; ; ; ; ; ; ${valorF.toFixed(2)}\n`; // Ensure two decimal places

    return (
      '\uFEFF' + // Adding BOM for UTF-8
      title + '\n' + 
      csvStringifier.getHeaderString() + 
      csvStringifier.stringifyRecords(records) + 
      '\n' + footer
    );
  }
}