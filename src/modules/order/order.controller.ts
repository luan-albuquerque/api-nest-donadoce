import { Controller, Get, Post, Body, Req, Query, DefaultValuePipe, ParseIntPipe, Patch, Param, Put } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderService } from './services/create-order.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindManyOrderByClientService } from './services/find-many-order-by-client.service';
import { FindManyOrderService } from './services/find-many-order.service';
import { PatchOrderDto } from './dto/patch-order.dto';
import { PatchOrderService } from './services/patch-order.service';
import { PatchStatusOrderItemService } from './services/patch-status-order-item.service';
import { PatchStatusOrderItemDto } from './dto/patch-status-order-item.';

@Controller('order')
@ApiBearerAuth()
@ApiTags("Order")
export class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly findManyOrderByClientService: FindManyOrderByClientService,
    private readonly findManyOrderService: FindManyOrderService,
    private readonly patchOrderService: PatchOrderService,
    private readonly patchStatusOrderItemService: PatchStatusOrderItemService
  ) { }


  @ApiBody({
    type: CreateOrderDto,
  })
  @Post()
  @ApiOperation({ summary: "EndPoint para criação de pedidos", description: "" })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req
  ) {
    return await this.createOrderService.execute(
      req.user.id,
      createOrderDto
    );
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
    name: 'numberOrder',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'desc_user_or_client',
    required: false,
    type: String,
  })

  @ApiQuery({
    name: 'statusOrder',
    required: false,
    type: Number,
  })

  @Get("all")
  @ApiOperation({ summary: "EndPoint em desenvolvimento", description: "" })
  async findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
    @Query('numberOrder') numberOrder = undefined,
    @Query('desc_user_or_client') desc_user = undefined,
    @Query('statusOrder') statusOrder = undefined,

  ) {
    return await this.findManyOrderService.execute({ desc_user, numberOrder, skip, take: limit, order_status: statusOrder })
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
    name: 'numberOrder',
    required: false,
    type: Number,
  })

  @ApiQuery({
    name: 'statusOrder',
    required: false,
    type: Number,
  })

  @Get("client")
  @ApiOperation({ summary: "EndPoint para listagem de pedidos", description: "Listagem de pedidos, obs: esta listando os do admin também por questões de resjuste" })
  async findAllByClient(
    @Req() req,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
    @Query('numberOrder') numberOrder = undefined,
    @Query('statusOrder') statusOrder = undefined,
  ) {
    return await this.findManyOrderByClientService.execute({
      fk_user: req.user.id,
      numberOrder,
      skip,
      take: limit,
      order_status: statusOrder,
    });

  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderService.findOne(+id);
  // }

  @Patch(':id')
  @ApiOperation({ summary: "EndPoint para atualizar status de pedidos" })
  async update(@Param('id') id: string, @Body() patchOrderDto: PatchOrderDto) {

    await this.patchOrderService.execute(id, patchOrderDto.fk_orderstatus);
  }

  @Put(':id')
  @ApiOperation({ summary: "EndPoint para atualizar status de item de pedidos extra que estão 'EM_HOMOLOGACAO'" })
  async updateOrderItem(@Param('id') id: string, @Body() data: PatchStatusOrderItemDto) {
    
    await this.patchStatusOrderItemService.execute(id, data);
  }


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}
