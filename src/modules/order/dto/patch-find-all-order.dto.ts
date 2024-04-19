import { ApiProperty } from "@nestjs/swagger"
import { OrderType } from "../types/ordertype.type"

export class PatchFindAllOrder {
  @ApiProperty()
  numberOrder?: number
  @ApiProperty()
  orderType?: OrderType
  @ApiProperty()
  fk_client?: string
  @ApiProperty()
  statusOrder?: string
  @ApiProperty()
  data?: Date

  skip: number
  
  take: number
}