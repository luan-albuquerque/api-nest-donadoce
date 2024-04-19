import { Module } from "@nestjs/common";
import { ControlProductionController } from "./control-production.controller";
import { DatabaseModule } from "src/shared/config/database/database.module";
import { ListKambaService } from "./services/list-kambam.service";
import { PatchUpdateSequencialService } from "./services/patch-update-sequencial.service";
import { PatchUpdateSequencialClientService } from "./services/patch-update-sequencial-client.service";

@Module({
    imports:[DatabaseModule],
    controllers: [
        ControlProductionController
    ],
    providers:[
        ListKambaService,
        PatchUpdateSequencialService,
        PatchUpdateSequencialClientService
    ]
})
export class ControlProduction{}