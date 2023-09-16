import { Module } from "@nestjs/common";
import { ControlProductionController } from "./control-production.controller";
import { DatabaseModule } from "src/shared/config/database/database.module";
import { ListKambaService } from "./services/list-kambam.service";

@Module({
    imports:[DatabaseModule],
    controllers: [
        ControlProductionController
    ],
    providers:[
        ListKambaService
    ]
})
export class ControlProduction{}