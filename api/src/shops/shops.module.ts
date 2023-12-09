import { Module } from '@nestjs/common'
import { ShopsService } from './shops.service'
import { ShopsController } from './shops.controller'
import { Shop } from './entities/shop.entity'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), HttpModule],
  controllers: [ShopsController],
  providers: [ShopsService]
})
export class ShopsModule {}
