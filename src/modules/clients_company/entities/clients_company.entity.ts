import { Client } from "src/modules/clients/entities/client.entity"
import { Company } from "src/modules/company/entities/company.entity"

export class ClientCompany {
    fk_company?: string
    fk_client?: string
    fone?: string
    accountable?: string
    clients?: Client
    company?: Company
    fk_user?: string;

}
