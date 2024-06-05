import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from '../repository/contract/OrderRepository';
import { ListByClientOrderDTO } from '../dto/list-by-client-order.dto';
import { UserRepository } from 'src/modules/users/repository/contract/UserRepository';


@Injectable()
export class FindManyOrderByClientService {

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,

  ) { }

  async execute({ fk_user, numberOrder, skip, take, order_status, fk_company }: ListByClientOrderDTO) {
    
    
    const user = await this.userRepository.finInforUser(fk_user);

     
    if(user.is_company){  
        fk_user = user?.Client_Company.clients.id;
        fk_company = user?.Client_Company.company.id;
      }

      return await this.orderRepository.findManyByClient({ fk_user, numberOrder, skip, take, order_status, fk_company })




  }
}