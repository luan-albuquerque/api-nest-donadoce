import { Controller, Get, Post, Body, Req, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateOrderBatch } from './dto/create_order_batch.dto';
import { FindManyOrderBatchService } from './services/find-many-order-batch.service';
import { CreateOrderBatchService } from './services/create-order-batch.service';


@Controller('order_batch')
@ApiBearerAuth()
@ApiTags("Order_Batch")
export class OrderBatchController {
  constructor(
    private readonly findManyOrderBatchService: FindManyOrderBatchService,
    private readonly createOrderBatchService: CreateOrderBatchService
  ) { }


  @Post()
  @ApiOperation({ summary: "EndPoint de lotes", description: "" })
  async create(@Body() createOrderBatch: CreateOrderBatch) {

    await this.createOrderBatchService.execute(createOrderBatch);

  }


  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'fk_client',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'invoice_number',
    required: false,
    type: String,
  })

  @ApiQuery({
    name: 'numberOrderBatch',
    required: false,
    type: Number,
  })

  @Get("")
  @ApiOperation({ summary: "EndPoint em listagem de lotes de pedidos", description: "" })
  async findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
    @Query('fk_client') fk_client = undefined,
    @Query('invoice_number') invoice_number = undefined,
    @Query('numberOrderBatch') numberOrderBatch = undefined,
  ) {
    await this.findManyOrderBatchService.execute({
      fk_client,
      invoice_number,
      numberOrderBatch,
      skip,
      take: limit
    })
  }

 
  @Get(":id")
  @ApiOperation({ summary: "EndPoint para listagem de pedidos", description: "Listagem de pedidos, obs: esta listando os do admin também por questões de resjuste" })
  async findAllByClient(
    @Req() req,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,

  ) {


  }


}
