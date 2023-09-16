import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import * as dayjs from "dayjs";
import { ListKambaService } from "./services/list-kambam.service";

@Controller('control-production')
@ApiBearerAuth()
@ApiTags("ControlProduction")
export class ControlProductionController {

    constructor(
        private readonly listKambaService: ListKambaService
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

}