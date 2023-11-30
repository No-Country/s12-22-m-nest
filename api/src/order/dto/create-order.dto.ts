import { Order, type Product } from '../entities/order.entity'
import { OmitType } from '@nestjs/mapped-types'

export class CreateOrderDto extends OmitType(Order, [
  'id',
  'dealer',
  'chat',
  'step',
  'status',
  'shipCoordinates',
  'shopCoordinates',
  'products'
]) {
  products: Product[]
}
