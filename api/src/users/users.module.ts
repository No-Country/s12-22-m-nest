import { Module, forwardRef } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderModule } from 'src/order/order.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => OrderModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
