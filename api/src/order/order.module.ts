import { Module, forwardRef } from '@nestjs/common'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { HttpModule } from '@nestjs/axios'
import { SocketModule } from 'src/socket/socket.module'
import { SocketDealerService } from 'src/socket/services/dealer.service'
import { SocketOrderService } from 'src/socket/services/order.service'
import { SocketGateway } from 'src/socket/socket.gateway'
import { ChatModule } from 'src/chat/chat.module'
import { UsersModule } from 'src/users/users.module'
import { ChatService } from 'src/chat/chat.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    HttpModule,
    forwardRef(() => SocketModule),
    ChatModule,
    forwardRef(() => UsersModule)
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    SocketGateway,
    SocketDealerService,
    SocketOrderService,
    ChatService
  ],
  exports: [OrderService, TypeOrmModule]
})
export class OrderModule {}
