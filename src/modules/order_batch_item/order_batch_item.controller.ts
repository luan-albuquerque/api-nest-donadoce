import { Controller, Get, Post, Body, Req, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiBearerAuth()
@ApiTags("Order")
export class OrderBatchItemController {
  constructor(
  ) { }

  @Post()
  @ApiOperation({ summary: "EndPoint para criação de lotes", description: "" })
  async create(
  ) { }

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

  @Get("")
  @ApiOperation({ summary: "EndPoint ", description: "" })
  async findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
    @Query('numberOrder') numberOrder = undefined,
    @Query('desc_user_or_client') desc_user = undefined,
    @Query('statusOrder') statusOrder = undefined,

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
