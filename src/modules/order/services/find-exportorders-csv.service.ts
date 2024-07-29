import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';
import { OrderRepository } from '../repository/contract/OrderRepository';
import * as dayjs from 'dayjs';
import { createObjectCsvStringifier } from 'csv-writer';

@Injectable()
export class FindExportListFaturamentoCsv {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(data1: Date = undefined, data2: Date = undefined, orderStatus: string = "", client: string = "", orderType: string = ""): Promise<string> {
    const dataInitial = dayjs(data1).utc(true).format("YYYY-MM-DD");
    const dataFinal = dayjs(data2).utc(true).format("YYYY-MM-DD");

    if (client !== "") {
      const findClient = await this.userRepository.findById(client);
      if (!findClient) {
        throw new NotFoundException("Cliente não encontrado");
      }
    }

    const data = await this.orderRepository.findListExportFaturamento(orderStatus, client, orderType.toLowerCase(), dataInitial, dataFinal);

 
    
    // Calcular lucro unitário e total

    const formatNumber = (num) => {
        if (num == null) return num; // Retorna null ou undefined se for o caso
        return parseFloat(num.toFixed(2));
      };
      
      const enhancedData = data.map((item) => {
        const unitProfit = formatNumber(item.valueOrderItem - item.unitcostofrevenue);
        const totalProfit = formatNumber(item.valueItemTotal - item.totalcostofrevenue);
        item.unitcostofrevenue =  formatNumber(item.unitcostofrevenue),
        item.totalcostofrevenue = formatNumber(item.totalcostofrevenue),
        item.valueOrderItem = formatNumber(item.valueOrderItem),
        item.valueItemTotal = formatNumber(item.valueItemTotal)
        return { 
          ...item, 
          unitProfit, 
          totalProfit
        };
      });
    // Calcular os totais
    const totalValueItem = enhancedData.reduce((sum, item) => sum + item.valueItemTotal, 0);
    const totalCost = enhancedData.reduce((sum, item) => sum + item.totalcostofrevenue, 0);
    const totalProfit = enhancedData.reduce((sum, item) => sum + item.totalProfit, 0);

    // Gerar CSV
    const csvString = await this.generateCsv(enhancedData, totalValueItem, totalCost, totalProfit);
    return csvString;
  }

  private async generateCsv(data: any[], totalValueItem: number, totalCost: number, totalProfit: number): Promise<string> {
    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'dateOrder', title: 'Data do Pedido' },
        { id: 'numberOrder', title: 'Numero do Pedido' },
        { id: 'descriptionStatus', title: 'Status do Pedido' },
        { id: 'client', title: 'Cliente' },
        { id: 'company', title: 'Empresa' },
        { id: 'description', title: 'Descricao' },
        { id: 'amountItem', title: 'Quantidade de Itens' },
        { id: 'valueOrderItem', title: 'Valor Unitario' },
        { id: 'valueItemTotal', title: 'Valor Total' },
        { id: 'unitcostofrevenue', title: 'Custo Unitario' },
        { id: 'totalcostofrevenue', title: 'Custo Total' },
        { id: 'unitProfit', title: 'Lucro Unitario' },
        { id: 'totalProfit', title: 'Lucro Total' },
      ],
      fieldDelimiter: ';',
      alwaysQuote: true,
    });

    const summaryRows = [
      { dateOrder: 'Valor Total: ' + totalValueItem.toFixed(2) },
      { dateOrder: 'Custo Total: ' + totalCost.toFixed(2) },
      { dateOrder: 'Lucro Total: ' +   totalProfit.toFixed(2) },
    ];

    return (
      '\uFEFF' + // Adding BOM for UTF-8
      csvStringifier.stringifyRecords(summaryRows) +
      csvStringifier.getHeaderString() +
      csvStringifier.stringifyRecords(data)
    );
  }
}
