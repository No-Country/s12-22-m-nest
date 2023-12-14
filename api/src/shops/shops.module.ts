import { Module } from '@nestjs/common'
import { ShopsService } from './shops.service'
import { ShopsController } from './shops.controller'
import { Shop } from './entities/shop.entity'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { Order } from 'src/order/entities/order.entity'
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'

@Module({
  imports: [TypeOrmModule.forFeature([Shop, Order]), HttpModule, CloudinaryModule],
  controllers: [ShopsController],
  providers: [ShopsService, CloudinaryService]
})
export class ShopsModule {}
