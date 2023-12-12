import {
  WebSocketGateway,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage
} from '@nestjs/websockets'
import { type Socket, type Server } from 'socket.io'
import { SocketDealerService } from './services/dealer.service'
import { SocketOrderService } from './services/order.service'
import { SocketMainService } from './services/main.service'
import { SocketShopService } from './services/shop.service'

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  constructor(
    private readonly socketOrderService: SocketOrderService,
    private readonly socketDealerService: SocketDealerService,
    private readonly socketMainService: SocketMainService,
    private readonly socketShopService: SocketShopService
  ) {}

  async handleConnection(socket: Socket) {
    await this.socketMainService.handleConnection(socket)
  }

  handleDisconnect(socket: Socket): void {
    this.socketMainService.handleDisconnect(socket)
  }

  // @MessageBody() data: any,
  // @ConnectedSocket() client: Socket,

  @SubscribeMessage('manageDealer')
  async handleManageDealer(client: any, data: any) {
    await this.socketDealerService.handleManageDealer(client, data)
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

  @SubscribeMessage('updateOrderStatus')
  handleUpdateOrderStatus(client: any, data: any) {
    this.socketShopService.updateActiveOrders(client, data)
  }
}
