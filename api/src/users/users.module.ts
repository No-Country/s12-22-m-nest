import { Module, forwardRef } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from 'src/order/entities/order.entity'
import { OrderModule } from 'src/order/order.module'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Order]),
    forwardRef(() => OrderModule)
  ],
  controllers: [UsersController],
  providers: [UsersService, CloudinaryService],
  exports: [UsersService]
})
export class UsersModule {}
