import { OmitType } from '@nestjs/mapped-types'
import { Shop } from '../entities/shop.entity'
import { IsNotEmpty } from 'class-validator'

export class CreateShopDto extends OmitType(Shop, ['id', 'coordinates']) {
  @IsNotEmpty()
    userId: string
}
