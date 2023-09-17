import { Body, Controller, Get, Param, Patch, Query, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import * as dayjs from "dayjs";
import { ListKambaService } from "./services/list-kambam.service";
import { PatchUpdateSequencialService } from "./services/patch-update-sequencial.service";
import { OrderType } from "src/modules/order/types/ordertype.type";


@Controller('control-production')
@ApiBearerAuth()
@ApiTags("ControlProduction")
export class ControlProductionController {

    constructor(
        private readonly listKambaService: ListKambaService,
        private readonly patchUpdateSequencialService: PatchUpdateSequencialService
    ){}
q
    @ApiQuery({
        name: 'order_type',
        required: false,
        type: String
      })
    @Get("kambam")
    @ApiOperation({ summary: "EndPoint para listaagen do kambam por produto", description: "É pertimido o filtro por 'programmed' ou 'coffe'" })
    async listKambam(
        @Query('order_type') orderIfType = "programmed"
    ) {

        var orderType: OrderType = orderIfType == "coffe" ? "coffe" : "programmed"
      
        return await this.listKambaService.execute(orderType);

    }


    @Patch("kambam/:id/:seq")
    @ApiOperation({ summary: "EndPoint para update de sequencial", description: "Rota para update de sequencial" })
    
    async patchKambam(@Param('id') id: string, @Param('seq') seq: number) {
      
        return await this.patchUpdateSequencialService.execute(id, seq)

    }

}