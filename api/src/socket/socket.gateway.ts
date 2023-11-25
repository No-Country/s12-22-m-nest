import {
  WebSocketGateway,
  type OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage
} from '@nestjs/websockets'
import { type Socket, type Server } from 'socket.io'
import { SocketDealerService } from './services/dealer.service'
import { SocketOrderService } from './services/order.service'
import { SocketMainService } from './services/main.service'

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server

  constructor(
    private readonly socketOrderService: SocketOrderService,
    private readonly socketDealerService: SocketDealerService,
    private readonly socketMainService: SocketMainService
  ) {}

  handleConnection(socket: Socket): void {
    this.socketMainService.handleConnection(socket)
  }

  @SubscribeMessage('manageDealer')
  handlemManageDealer(client: any, data: any) {
    this.socketDealerService.handleManageDealer(client, data)
  }

  @SubscribeMessage('updateDealerLocation')
  async handleUpdateDealerLocation(client: any, data: any) {
    console.log('updateDealerLocation', data)
    await this.socketDealerService.updateDealerLocation(client, data)
  }

  @SubscribeMessage('joinOrderClient')
  async handleJoinOrderClient(client: any, data: any) {
    await this.socketOrderService.joinOrderClient(client, data)
  }

  @SubscribeMessage('joinOrderDealer')
  async handleJoinOrderDealer(client: any, data: any) {
    await this.socketOrderService.joinOrderDealer(client, data)
  }
}
