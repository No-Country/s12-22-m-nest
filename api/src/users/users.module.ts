import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from 'src/order/entities/order.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
