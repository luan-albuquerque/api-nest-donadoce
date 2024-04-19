import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { ClientsCompanyRepository } from "../repository/contract/ClientsCompanyRepository";

@Injectable()
class FindOneByClientCompanyService {
    constructor(
        private readonly clientsCompanyRepository: ClientsCompanyRepository,
    ) { }

    async execute(fk_client: string ) {     
      return await this.clientsCompanyRepository.findOneByClient(fk_client)
    }
}


export default FindOneByClientCompanyService;
