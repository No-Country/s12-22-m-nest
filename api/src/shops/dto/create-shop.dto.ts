import { OmitType } from '@nestjs/mapped-types'
import { Shop } from '../entities/shop.entity'

export class CreateShopDto extends OmitType(Shop, ['id', 'coordinates']) {}
