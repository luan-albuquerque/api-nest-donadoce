import { Controller, Get, Post, Body, Patch, Query, DefaultValuePipe, ParseIntPipe, UseInterceptors, UploadedFiles, Param, Req, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateOrderBatch } from './dto/create_order_batch.dto';
import { FindManyOrderBatchService } from './services/find-many-order-batch.service';
import { CreateOrderBatchService } from './services/create-order-batch.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerOptionsOrderBatch } from 'src/shared/http/middlewares/multerOrderBatch.middleware';
import { AddPaymentVoucherOrderBatch } from './dto/add_payment_voucher_order_batch.dto';
import { AddPaymentVoucherInOrderBatchService } from './services/add-payment-voucher-in-order-batch.service';
import { multerOptionsPayment } from 'src/shared/http/middlewares/multerPaymentmiddleware';
import { multerOptionsInvoice } from 'src/shared/http/middlewares/multerInvoicemiddleware';
import { DeleteOrderBatchService } from './services/delete-orderbatch.service';
import { UpdateInvoiceOrderBatch } from './dto/update_invoice_order_batch.dto';
import { UpdateInvoiceInOrderBatch } from './services/update-invoice-in-order-batch.service';


@Controller('order_batch')
@ApiBearerAuth()
@ApiTags("Order_Batch")
export class OrderBatchController {
  constructor(
    private readonly findManyOrderBatchService: FindManyOrderBatchService,
    private readonly createOrderBatchService: CreateOrderBatchService,
    private readonly addPaymentVoucherInOrderBatchService: AddPaymentVoucherInOrderBatchService,
    private readonly deleteOrderBatchService: DeleteOrderBatchService,
    private readonly updateInvoiceInOrderBatch: UpdateInvoiceInOrderBatch
  ) { }


  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file_invoice', maxCount: 1 },
      ],
      multerOptionsInvoice,
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: "EndPoint de lotes", description: "" })
  async create(@Req() req, @Body() createOrderBatch: CreateOrderBatch, @UploadedFiles() files: any,
  ) {

    const file_invoice = files ? files.file_invoice ? files.file_invoice[0].filename : null : null;
    // const file_caution = files ? files.file_caution ? files.file_caution[0].filename : null : null;
    // const file_payment_voucher = files ? files.file_payment_voucher ? files.file_payment_voucher[0].filename : null : null;

    const bodyform = Object(createOrderBatch)

    const newData: CreateOrderBatch = {
      createOrderBatchItem: Object(JSON.parse(bodyform.createOrderBatchItem)),
      end_date: new Date(bodyform.end_date),
      initial_date: new Date(bodyform.initial_date),
      fk_client: bodyform.fk_client,
      invoice_number: bodyform.invoice_number,
      userOpenOrderBatch: req.user.id,
      // file_caution: file_caution,
      // file_caution_absolute: files.file_caution[0].path,
      file_invoice: file_invoice,
      file_invoice_absolute: files.file_invoice[0].path,
      // file_payment_voucher: file_payment_voucher,
      // file_payment_voucher_absolute:  files.file_payment_voucher[0].path,
    }

    await this.createOrderBatchService.execute(newData);



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
    return await this.findManyOrderBatchService.execute({
      fk_client,
      invoice_number,
      numberOrderBatch,
      skip,
      take: limit
    })
  }


  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file_payment_voucher', maxCount: 1 },
      ],
      multerOptionsPayment,
    ),
  )
  @ApiConsumes('multipart/form-data')
  @Patch(":id")
  @ApiOperation({ summary: "EndPoint para adicionar comprovante de pagamento" })
  async addPaymentVoucher(
    @Param("id") id: string,
    @Body() addPaymentVoucherOrderBatch: AddPaymentVoucherOrderBatch,
    @UploadedFiles() files: any
  ) {
    const file_payment_voucher = files ? files.file_payment_voucher ? files.file_payment_voucher[0].filename : null : null;

    await this.addPaymentVoucherInOrderBatchService.execute(id, file_payment_voucher, files.file_payment_voucher[0].path);
  }


  @Delete(":id")
  @ApiOperation({ summary: "EndPoint para deletar lote e itens dentro do lote" })
  async deleteOrderBatch(
    @Param("id") id: string,
  
  ) {
    return await this.deleteOrderBatchService.execute(id);
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
  @ApiOperation({ summary: "EndPoint para Atualizar Nota Fiscal" })
  async updateInvoice(
    @Param("id") id: string,
    @Body() updateInvoiceOrderBatch: UpdateInvoiceOrderBatch,
    @UploadedFiles() files: any
  ) {
    const file_invoice = files ? files.file_invoice ? files.file_invoice[0].filename : null : null;

    

    const bodyform = JSON.parse(JSON.stringify(updateInvoiceOrderBatch))


   

    await this.updateInvoiceInOrderBatch.execute(id, {invoice_number:bodyform.invoice_number, file_invoice });
  }


}
