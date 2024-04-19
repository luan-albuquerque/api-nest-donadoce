import { Controller, Get, Post, Body, Req, Query, DefaultValuePipe, ParseIntPipe, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateOrderBatchItemManual } from './dto/create_order_batch_item_manual.dto';
import { CreateOrderBatchItemService } from './services/create-order-batch-item.service';
import { RemoveOrderBatchItemService } from './services/remove-order-batch-item.service';

@Controller('order_batch_item')
@ApiBearerAuth()
@ApiTags("Order Batch Item")
export class OrderBatchItemController {
  constructor(
    private readonly createOrderBatchItemService: CreateOrderBatchItemService,
    private readonly removeOrderBatchItemService: RemoveOrderBatchItemService
  ) { }

  @Post()
  @ApiBody({
    type: CreateOrderBatchItemManual,
    isArray: true,
  })
  @ApiOperation({ summary: "EndPoint para adicionar pedidos em lote", description: "" })
  async create(@Body() data: CreateOrderBatchItemManual[]) {
    await this.createOrderBatchItemService.execute(data);
  }

  
  @Delete(':fk_order/:fk_orderBatch')
  @ApiOperation({ summary: "EndPoint para remover pedidos em lote", description: "" })
  async remove(
    @Param('fk_order') fk_order: string,
    @Param('fk_orderBatch') fk_orderBatch: string
  ) {
    await this.removeOrderBatchItemService.execute({ fk_order, fk_orderBatch })
  }
}
