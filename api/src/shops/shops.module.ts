import { Module } from '@nestjs/common'
import { ShopsService } from './shops.service'
import { ShopsController } from './shops.controller'
import { Shop } from './entities/shop.entity'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), HttpModule, CloudinaryModule],
  controllers: [ShopsController],
  providers: [ShopsService, CloudinaryService]
})
export class ShopsModule {}
