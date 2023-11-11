import { Controller, Delete, Post, Body, Req, Query, DefaultValuePipe, UploadedFiles, ParseIntPipe, Patch, Param, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddItemInOrderProgrammedService } from './services/add-item-in-order-programmed.service';
import { RemoveItemInOrderProgrammedService } from './services/remove-item-in-order-programmed.service';
import { PatchItemInOrderProgrammedService } from './services/patch-item-in-order-programmed.service';
import { AddItemInOrderDTO } from './dto/add-item-in-order-programmed.dto';
import { RemoveItemInOrderDTO } from './dto/remove-item-in-order-programmed.dto';
import { PatchItemInOrderDTO } from './dto/patch-item-in-order-programmed.dto';


@Controller('orderitem')
@ApiBearerAuth()
@ApiTags("OrderItem")
export class OrderItemController {
  constructor(
    private readonly addItemInOrderProgrammedService: AddItemInOrderProgrammedService,
    private readonly removeItemInOrderProgrammedService: RemoveItemInOrderProgrammedService,
    private readonly patchItemInOrderProgrammedService: PatchItemInOrderProgrammedService
  ) { }

  @Post("programmed")
  @ApiOperation({ summary: "EndPoint para criação de itens dentro de pedidos", description: "Rota para criação de itens de pedidos em pedido. Obs: method_of_preparation deve ser 'roast' ou 'frozen'" })
  async create(
    @Body() addItemInOrderDTO: AddItemInOrderDTO,
    @Req() req
  ) {
    return await this.addItemInOrderProgrammedService.execute(
      req.user.id,
      addItemInOrderDTO
    );
  }

  @Delete("remove")
  @ApiOperation({ summary: "EndPoint para remove itens de pedidos" })
  async remove(
    @Body() removeItemInOrderDTO: RemoveItemInOrderDTO,
    @Req() req
  ) {
    return await this.removeItemInOrderProgrammedService.execute(
      removeItemInOrderDTO
    );
  }

  @Patch("updateQuantity")
  @ApiOperation({ summary: "EndPoint para atualização de quantidade" })
  async patch(
    @Body() patchItemInOrderDTO: PatchItemInOrderDTO,
    @Req() req
  ) {
    return await this.patchItemInOrderProgrammedService.execute(
      patchItemInOrderDTO
    );
  }


}
