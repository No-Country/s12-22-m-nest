import { Module, forwardRef } from '@nestjs/common'
import { SocketGateway } from './socket.gateway'
import { HttpModule } from '@nestjs/axios'
import { SocketMainService } from './services/main.service'
import { SocketDealerService } from './services/dealer.service'
import { SocketOrderService } from './services/order.service'
import { AppModule } from 'src/app.module'
import { AppService } from 'src/app.service'
import { SocketChatService } from './services/chat.service'
import { ChatModule } from 'src/chat/chat.module'

@Module({
  imports: [HttpModule, forwardRef(() => AppModule), forwardRef(() => ChatModule)],
  providers: [
    SocketGateway,
    SocketMainService,
    SocketDealerService,
    SocketOrderService,
    SocketChatService,
    AppService
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
