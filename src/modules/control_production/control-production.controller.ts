import { Body, Controller, Get, Param, Patch, Query, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import * as dayjs from "dayjs";
import { ListKambaService } from "./services/list-kambam.service";
import { PatchUpdateSequencialService } from "./services/patch-update-sequencial.service";

@Controller('control-production')
@ApiBearerAuth()
@ApiTags("ControlProduction")
export class ControlProductionController {

    constructor(
        private readonly listKambaService: ListKambaService,
        private readonly patchUpdateSequencialService: PatchUpdateSequencialService
    ){}


    @ApiQuery({
        name: 'date',
        required: false,
        type: Date,
      })
    @Get("kambam")
    @ApiOperation({ summary: "EndPoint para criação de pedidos programados", description: "Rota para criação de pedidos programados. Obs: method_of_preparation deve ser 'roast' ou 'frozen'" })
    async listKambam(
        @Query('date') date = undefined
    ) {
      
        return await this.listKambaService.execute(date);

    }


    @Patch("kambam/:id/:seq")
    @ApiOperation({ summary: "EndPoint para update de sequencial", description: "Rota para update de sequencial" })
    
    async patchKambam(@Param('id') id: string, @Param('seq') seq: number) {
      
        return await this.patchUpdateSequencialService.execute(id, seq)

    }

}