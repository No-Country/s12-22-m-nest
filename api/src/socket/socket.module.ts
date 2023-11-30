import { Module, forwardRef } from '@nestjs/common'
import { SocketGateway } from './socket.gateway'
import { HttpModule } from '@nestjs/axios'
import { SocketMainService } from './services/main.service'
import { SocketDealerService } from './services/dealer.service'
import { SocketOrderService } from './services/order.service'
import { SocketChatService } from './services/chat.service'
import { ChatModule } from 'src/chat/chat.module'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { OrderModule } from 'src/order/order.module'
import { OrderService } from 'src/order/order.service'

@Module({
  imports: [
    HttpModule,
    forwardRef(() => UsersModule),
    forwardRef(() => ChatModule),
    forwardRef(() => OrderModule)
  ],
  providers: [
    SocketGateway,
    SocketMainService,
    SocketDealerService,
    SocketOrderService,
    SocketChatService,
    UsersService,
    OrderService
  ],
  exports: [
    SocketMainService,
    SocketGateway,
    SocketDealerService,
    SocketOrderService,
    SocketChatService
  ]
})
export class SocketModule {}
