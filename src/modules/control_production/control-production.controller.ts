import { Body, Controller, Get, Param, Patch, Query, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import * as dayjs from "dayjs";
import { ListKambaService } from "./services/list-kambam.service";
import { PatchUpdateSequencialService } from "./services/patch-update-sequencial.service";
import { OrderType } from "src/modules/order/types/ordertype.type";
import { ModeKambamType } from "./types/modekambam.type";
import { PatchUpdateSequencialClientService } from "./services/patch-update-sequencial-client.service";
import { PatchSetControlProductionProductDto } from "./dtos/patch-set-control-production.dto";


@Controller('control-production')
@ApiBearerAuth()
@ApiTags("ControlProduction")
export class ControlProductionController {

    constructor(
        private readonly listKambaService: ListKambaService,
        private readonly patchUpdateSequencialService: PatchUpdateSequencialService,
        private readonly patchUpdateSequencialClientService: PatchUpdateSequencialClientService
    ) { }
    q
    @ApiQuery({
        name: 'order_type',
        required: false,
        type: String
    })
    @ApiQuery({
        name: 'mode_kambam',
        required: false,
        type: String
    })
    @Get("kambam")
    @ApiOperation({ summary: "EndPoint para listaagen do kambam por produto", 
    description: "É pertimido o filtro por order_type 'programmed' ou 'coffe' e mode_kambam como 'product'  ou 'client' " })
    async listKambam(
        @Query('order_type') orderIfType = "programmed",
        @Query('mode_kambam') modeKambamIfType = "product"
    ) {

        var orderType: OrderType = orderIfType == "coffe" ? "coffe" : "programmed"
        var mode: ModeKambamType = modeKambamIfType == "product" ? "product" : "client";

        return await this.listKambaService.execute(orderType, mode);

    }


    @Patch("kambam/production")
    @ApiOperation({ summary: "EndPoint para update de sequencial", description: "Rota para update de sequencial" })

    async patchKambam(@Body() data: PatchSetControlProductionProductDto[]) {

        return await this.patchUpdateSequencialService.execute(data);

    }

    @Patch("kambam/client/:id/:seq")
    @ApiOperation({ summary: "EndPoint para update de sequencial em Client", description: "Rota para update de sequencial em Client" })

    async patchKambamClient(@Param('id') id: string, @Param('seq') seq: number) {

        return await this.patchUpdateSequencialClientService.execute(id, seq)

    }


}