/* eslint-disable @typescript-eslint/indent */
import { IsArray, IsString } from 'class-validator'

export class CreateOrderDto {
  @IsString()
  shipAddress: string

  @IsString()
  client: string

  @IsString()
  shop: string

  @IsArray()
  products: string[]
}
