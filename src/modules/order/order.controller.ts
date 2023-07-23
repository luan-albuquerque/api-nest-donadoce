import { Controller, Get, Post, Body, Req,Query, DefaultValuePipe, ParseIntPipe} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderService } from './services/create-order.service';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindManyOrderByClientService } from './services/find-many-order-by-client.service';

@Controller('order')
@ApiBearerAuth()
@ApiTags("Order")
export class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly findManyOrderByClientService: FindManyOrderByClientService,
    ) {}

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

  @Get("all")
  @ApiOperation({ summary: "EndPoint em desenvolvimento", description: "" })
  findAll(
    @Req() req
  ) {

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

  @Get("client")
  @ApiOperation({ summary: "EndPoint para listagem de pedidos", description: "Listagem de pedidos, obs: esta listando os do admin também por questões de resjuste" })
  async findAllByClient(
    @Req() req,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
    @Query('numberOrder') numberOrder = undefined,
  ) {
    return await this.findManyOrderByClientService.execute({
      fk_user:req.user.id,
      numberOrder,
      skip,
      take: limit
    });
  
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}
