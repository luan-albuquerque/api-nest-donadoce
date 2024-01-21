import { Controller, Get, Post, Body, Req, Query, DefaultValuePipe, UploadedFiles, ParseIntPipe, Patch, Param, Put, UseInterceptors } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
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
import { CreateOrderCoffeDto } from './dto/create-order-coffe.dto';
import { CreateOrderCoffeService } from './services/create-order-coffe.service';
import { PatchAddCautionOrderService } from './services/patch-add-caution-order.service';
import { multerOptionsCaution } from 'src/shared/http/middlewares/multerCaution.middleware';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AddCautionInOrder } from './dto/add-caution-in-order.dto';
import { FindOrderItemInHomologateService } from './services/find-order-item-in-homologate.service';
import { AddInvoiceInOrder } from './dto/add-invoice-in-order.dto';
import { PatchAddInvoiceOrderService } from './services/patch-add-invoice-order.service';
import { AddPaymentVoucherInOrder } from './dto/add-payment-voucher-in-order.dto';
import { PatchAddPaymentVoucherOrderService } from './services/patch-add-payment-voucher-order.service';
import { multerOptionsPayment } from 'src/shared/http/middlewares/multerPaymentmiddleware';
import { multerOptionsInvoice } from 'src/shared/http/middlewares/multerInvoicemiddleware';
import { FindManyOrderRoutesService } from './services/find-many-order-routes.service';
import { OrderType } from './types/ordertype.type';
import { FindManyOrderAllFiltersService } from './services/find-many-order-all-filters.service';
import { FindManyOrderToBatchService } from './services/find-many-order-to-batch.service';

@Controller('order')
@ApiBearerAuth()
@ApiTags("Order")
export class OrderController {
  constructor(
    private readonly createOrderProgrammedService: CreateOrderProgrammedService,
    private readonly createOrderCoffeService: CreateOrderCoffeService,
    private readonly findManyOrderByClientService: FindManyOrderByClientService,
    private readonly findManyOrderService: FindManyOrderService,
    private readonly patchOrderStatusService: PatchOrderStatusService,
    private readonly patchStatusOrderItemService: PatchStatusOrderItemService,
    private readonly patchTrayOrderService: PatchTrayOrderService,
    private readonly patchDisabledOrderService: PatchDisabledOrderService,
    private readonly findManyOrderInProcess: FindManyOrderInProcess,
    private readonly patchAddCautionOrderService: PatchAddCautionOrderService,
    private readonly findOrderItemInHomologateService: FindOrderItemInHomologateService,
    private readonly patchAddInvoiceOrderService: PatchAddInvoiceOrderService,
    private readonly patchAddPaymentVoucherOrderService: PatchAddPaymentVoucherOrderService,
    private readonly findManyOrderRoutesService: FindManyOrderRoutesService,
    private readonly findManyOrderAllFiltersService: FindManyOrderAllFiltersService,
    private readonly findManyOrderToBatchService: FindManyOrderToBatchService
  ) { }

  @Get('kambamRoute')
  @ApiOperation({ summary: "Lista de pedidos com prioridade" })
  @ApiQuery({
    name: 'statusOrder',
    required: false,
    type: Number,
  })
  async kambamRoute(
    @Query('statusOrder') statusOrder = undefined,
  ): Promise<any> {

    const orderType: OrderType = statusOrder == 1 ? "programmed" : "coffe";

    return await this.findManyOrderRoutesService.execute(orderType);
  }

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



  @ApiBody({
    type: CreateOrderCoffeDto,
  })
  @Post("coffe")
  @ApiOperation({ summary: "EndPoint para criação de pedidos coffe", description: "Rota para criação de pedidos coffe. Obs: method_of_preparation deve ser 'roast' ou 'frozen'" })
  async createCoffe(
    @Body() createOrderCoffeDto: CreateOrderCoffeDto,
    @Req() req
  ) {
    return await this.createOrderCoffeService.execute(
      req.user.id,
      createOrderCoffeDto
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
    name: 'orderType',
    required: false,
    type: String,
  })

  @ApiQuery({
    name: 'desc_user_or_client',
    required: false,
    type: String,
  })

  @ApiQuery({
    name: 'statusOrder',
    required: false,
    type: String,
  })

  @ApiQuery({
    name: 'fk_client',
    required: false,
    type: String,
  })

  @ApiQuery({
    name: "fk_company",
    required: false,
    type: String
  })

  @ApiQuery({
    name: 'data',
    required: false,
    type: Date,
  })

  @Get("all")
  @ApiOperation({ summary: "EndPoint em desenvolvimento", description: "" })
  async findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
    @Query('numberOrder') numberOrder = undefined,
    @Query('orderType') orderType = undefined,
    @Query('desc_user_or_client') desc_user = undefined,
    @Query('fk_client') fk_client = undefined,
    @Query('fk_company') fk_company = undefined,
    @Query('statusOrder') statusOrder = undefined,
    @Query('data') data = undefined,
  ) {
    var orderTypeOfi: OrderType = undefined
    var fk_clientOfi = undefined
    var fk_status = undefined
    var fk_companyOfi = undefined

    if (orderType != undefined) {

      orderType == "programmed" ? orderTypeOfi = "programmed" : orderType == "coffe" ? orderTypeOfi = "coffe" : orderTypeOfi = undefined;
    }
    if (statusOrder !== "undefined") {
      fk_status = statusOrder
    }

    if (fk_client !== "undefined") {
      fk_clientOfi = fk_client
    }

    if (fk_company !== "fk_company") {
      fk_companyOfi = fk_company
    }

    return await this.findManyOrderService.execute({
      data,
      desc_user,
      numberOrder,
      skip,
      take: limit,
      fk_company: fk_companyOfi,
      order_status: fk_status,
      orderType: orderTypeOfi,
      fk_client: fk_clientOfi
    })
  }



  @Post("caution/:id")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file_caution', maxCount: 1 },
      ],
      multerOptionsCaution,
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: "EndPoint para adição de cautela", description: "" })
  async addCaution(
    @Param('id') id: string,
    @UploadedFiles() files: any,
    @Body() addCautionInOrder: AddCautionInOrder
  ) {

    const file_caution = files ? files.file_caution ? files.file_caution[0].filename : null : null;

    return await this.patchAddCautionOrderService.execute(id, file_caution, files.file_caution[0].path || null);
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

  @ApiQuery({
    name: 'fk_company',
    required: false,
    type: String,
  })

  @Get("client")
  @ApiOperation({ summary: "EndPoint para listagem de pedidos", description: "Listagem de pedidos, obs: esta listando os do admin também por questões de resjuste" })
  async findAllByClient(
    @Req() req,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
    @Query('numberOrder') numberOrder = undefined,
    @Query('statusOrder') statusOrder = undefined,
    @Query('fk_company') fk_company = undefined,
  ) {
    return await this.findManyOrderByClientService.execute({
      fk_user: req.user.id,
      numberOrder,
      skip,
      take: limit,
      fk_company,
      order_status: statusOrder,
    });

  }

  @Get("inProcess")
  @ApiOperation({ summary: "Lista de pedidos em processamento", description: "Lista de pedidos Lanche 1, Lanche 2 do dia atual e Dejejum do dia seguinte que estão no status em processamento" })
  async findProductInProcess() {

    const data = await this.findManyOrderInProcess.execute();;

    return data;
  }

  @Patch(':id')
  @ApiOperation({ summary: "EndPoint para atualizar status de pedidos" })
  async update(@Param('id') id: string, @Body() patchOrderDto: PatchOrderDto) {

    await this.patchOrderStatusService.execute(id, patchOrderDto.fk_orderstatus);
  }
  

  @Patch('tray/:id')
  @ApiOperation({ summary: "EndPoint para atualizar e adicionar bandejas em pedidos'" })
  async updateTryInOrder(@Param('id') id: string, @Body() data: PatchTrayOrderDto) {

    await this.patchTrayOrderService.execute(id, data.amount_of_tray, data.amount_of_boxes)
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


  @Get('verifyOrderItem/:fk_order')
  @ApiOperation({ summary: "Verificar se existem itens de pedidos fora do cardapio com staus Homologate" })
  async verifyOrderItem(@Param('fk_order') fk_order: string) {

    await this.findOrderItemInHomologateService.execute(fk_order);
  }


  @Put(":fk_order")
  @ApiOperation({ summary: "Verificar se existem itens de pedidos fora do cardapio com staus Homologate" })
  async UpdateItensOfOrder(@Param('fk_order') fk_order: string) {

    await this.findOrderItemInHomologateService.execute(fk_order);
  }

  @Patch("invoice/:id")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file_invoice', maxCount: 1 },
      ],
      multerOptionsInvoice,
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: "EndPoint para adição e atualização de nota fiscal em pedido", description: "Voce pode atualizar tando o numero quanto o pedido" })
  async addInvoice(
    @Param('id') id: string,
    @UploadedFiles() files: any,
    @Body() addInvoiceInOrder: AddInvoiceInOrder
  ) {

    const file_invoice = files ? files.file_invoice ? files.file_invoice[0].filename : null : null;
    await this.patchAddInvoiceOrderService.execute(id, file_invoice, files.file_invoice[0].path, addInvoiceInOrder.number_invoice);
  }

  @Patch("payment_voucher/:id")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file_payment_voucher', maxCount: 1 },
      ],
      multerOptionsPayment
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: "EndPoint para adição de comprovante de pagamento", description: "Voce pode atualizar tando inumeras vezes até ser finalizado" })
  async addPaymentVouncher(
    @Param('id') id: string,
    @UploadedFiles() files: any,
    @Body() addPaymentVoucherInOrder: AddPaymentVoucherInOrder,
    @Req() req

  ) {

    const file_payment_voucher = files ? files.file_payment_voucher ? files.file_payment_voucher[0].filename : null : null;
    await this.patchAddPaymentVoucherOrderService.execute(req.user.id, id, file_payment_voucher, files.file_payment_voucher[0].path);

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
    name: 'orderType',
    required: false,
    type: String,
  })

  @ApiQuery({
    name: 'desc_user_or_client',
    required: false,
    type: String,
  })

  @ApiQuery({
    name: 'statusOrder',
    required: false,
    type: String,
  })

  @ApiQuery({
    name: 'fk_client',
    required: false,
    type: String,
  })

  @ApiQuery({
    name: 'listWithOrderBatchNull',
    required: false,
    type: Number,
  })


  @Get("all2")
  @ApiOperation({ summary: "EndPoint para listagem de pedidos ", description: "Utilizar apenas com modo Adm" })
  async findAll2(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
    @Query('numberOrder') numberOrder = undefined,
    @Query('orderType') orderType = undefined,
    @Query('desc_user_or_client') desc_user = undefined,
    @Query('fk_client') fk_client = undefined,
    @Query('statusOrder') statusOrder = undefined,
    @Query('listWithOrderBatchNull') listWithOrderBatchNull = 0,
    

  ) {
    var orderTypeOfi: OrderType = undefined
    var fk_clientOfi = undefined
    var fk_status = undefined
    var listWithOrderBatchNullOf = false;

    if(listWithOrderBatchNull == 1){
      listWithOrderBatchNullOf = true
    }

    if (orderType != undefined) {

      orderType == "programmed" ? orderTypeOfi = "programmed" : orderType == "coffe" ? orderTypeOfi = "coffe" : orderTypeOfi = undefined;
    }
    if (statusOrder !== "undefined") {
      fk_status = statusOrder
    }

    if (fk_client !== "undefined") {
      fk_clientOfi = fk_client
    }

    return await this.findManyOrderAllFiltersService.execute({
      desc_user,
      numberOrder,
      skip,
      take: limit,
      order_status: fk_status,
      orderType: orderTypeOfi,
      fk_client: fk_clientOfi
    },
    listWithOrderBatchNullOf
    )
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
    name: 'orderType',
    required: false,
    type: String,
  })

  @ApiQuery({
    name: 'statusOrder',
    required: false,
    type: String,
  })

  @ApiQuery({
    name: 'fk_client',
    required: false,
    type: String,
  })


  @Get("allOrdersToBatch")
  @ApiOperation({ summary: "EndPoint para listagem de pedidos para o Lote ", description: "Utilizar apenas com modo Adm e no modal de lotes" })
  async findAllOrderToBatch(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
    @Query('numberOrder') numberOrder = undefined,
    @Query('orderType') orderType = undefined,
    @Query('fk_client') fk_client = undefined,
    @Query('statusOrder') statusOrder = undefined,

  ) {
    var orderTypeOfi: OrderType = undefined
    var fk_clientOfi = undefined
    var fk_status = undefined

    if (orderType != undefined) {

      orderType == "programmed" ? orderTypeOfi = "programmed" : orderType == "coffe" ? orderTypeOfi = "coffe" : orderTypeOfi = undefined;
    }
    if (statusOrder !== "undefined") {
      fk_status = statusOrder
    }

    if (fk_client !== "undefined") {
      fk_clientOfi = fk_client
    }

    return await this.findManyOrderToBatchService.execute({
      numberOrder,
      skip,
      take: limit,
      order_status: fk_status,
      orderType: orderTypeOfi,
      fk_client: fk_clientOfi
    })
  }
  


  
}
