import { Controller, Get, Post, Body, Req, Query, DefaultValuePipe, ParseIntPipe, Patch, Param, Put } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindManyOrderByClientService } from './services/find-many-order-by-client.service';
import { FindManyOrderService } from './services/find-many-order.service';
import { PatchOrderDto } from './dto/patch-order.dto';
import { PatchOrderStatusService } from './services/patch-order-status.service';
import { PatchStatusOrderItemService } from './services/patch-status-order-item.service';
import { PatchStatusOrderItemDto } from './dto/patch-status-order-item.';
import { PatchTrayOrderDto } from './dto/patch-tray-order.dto';
import { PatchTrayOrderService } from './services/patch-tray-order.service';
import { PatchDisabledOrderService } from './services/patch-disabled-order.service';
import { FindManyOrderInProcess } from './services/find-many-order-in-process.service';
import { CreateOrderProgrammedService } from './services/create-order-programmed.service';
import * as dayjs from 'dayjs';

@Controller('order')
@ApiBearerAuth()
@ApiTags("Order")
export class OrderController {
  constructor(
    private readonly createOrderProgrammedService: CreateOrderProgrammedService,
    private readonly findManyOrderByClientService: FindManyOrderByClientService,
    private readonly findManyOrderService: FindManyOrderService,
    private readonly patchOrderStatusService: PatchOrderStatusService,
    private readonly patchStatusOrderItemService: PatchStatusOrderItemService,
    private readonly patchTrayOrderService: PatchTrayOrderService,
    private readonly patchDisabledOrderService: PatchDisabledOrderService,
    private readonly findManyOrderInProcess: FindManyOrderInProcess
  ) { }


  @ApiBody({
    type: CreateOrderDto,
  })
  @Post("programmed")
  @ApiOperation({ summary: "EndPoint para criação de pedidos programados", description: "Rota para criação de pedidos programados. Obs: method_of_preparation deve ser 'roast' ou 'frozen'" })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req
  ) {
    return await this.createOrderProgrammedService.execute(
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

  @Get("inProcess")
  @ApiOperation({ summary: "Lista de pedidos em processamento", description: "Lista de pedidos Lanche 1, Lanche 2 do dia atual e Dejejum do dia seguinte que estão no status em processamento"})
  async findProductInProcess() {
    
    const data = await this.findManyOrderInProcess.execute();;

    return  data;
  }

  @Patch(':id')
  @ApiOperation({ summary: "EndPoint para atualizar status de pedidos" })
  async update(@Param('id') id: string, @Body() patchOrderDto: PatchOrderDto) {

    await this.patchOrderStatusService.execute(id, patchOrderDto.fk_orderstatus);
  }

  @Patch('tray/:id')
  @ApiOperation({ summary: "EndPoint para atualizar e adicionar bandejas em pedidos'" })
  async updateTryInOrder(@Param('id') id: string, @Body() data: PatchTrayOrderDto) {

    await this.patchTrayOrderService.execute(id, data.amount_of_tray)
  }


  @Patch('homologate/:id')
  @ApiOperation({ summary: "EndPoint para atualizar status de item de pedidos extra que estão 'EM_HOMOLOGACAO'" })
  async updateOrderItem(@Param('id') id: string, @Body() data: PatchStatusOrderItemDto) {

    await this.patchStatusOrderItemService.execute(id, data);
  }

  @Patch('disabled/:id')
  @ApiOperation({ summary: "EndPoint para cancelar pedido " })
  async disabledOrder(@Param('id') id: string) {

    await this.patchDisabledOrderService.execute(id);
  }

}
