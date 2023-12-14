import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { Product } from './entities/product.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, CloudinaryService]
})
export class ProductsModule {}
