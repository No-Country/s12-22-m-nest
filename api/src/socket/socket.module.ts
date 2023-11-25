import { Module } from '@nestjs/common'
import { SocketGateway } from './socket.gateway'
import { HttpModule } from '@nestjs/axios'
import { SocketMainService } from './main.service'
import { SocketDealerService } from './dealer.service'
import { SocketOrderService } from './order.service'
import { AppService } from 'src/app.service'

@Module({
  imports: [HttpModule],
  providers: [
    SocketGateway,
    SocketMainService,
    SocketDealerService,
    SocketOrderService,
    AppService
  ],
  exports: [SocketMainService, SocketGateway, SocketDealerService]
})
export class SocketModule {}
