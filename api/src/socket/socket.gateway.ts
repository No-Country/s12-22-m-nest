import {
  WebSocketGateway,
  type OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
  MessageBody
} from '@nestjs/websockets'
import { type Socket, type Server } from 'socket.io'
import { SocketDealerService } from './dealer.service'
import { SocketOrderService } from './order.service'
import { type Order } from './interfaces'
import { SocketMainService } from './main.service'
import { AppService } from 'src/app.service'
import type * as ws from 'ws'

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server

  constructor(
    private readonly socketOrderService: SocketOrderService,
    private readonly socketDealerService: SocketDealerService,
    private readonly socketMainService: SocketMainService,
    private readonly appService: AppService
  ) {}

  handleConnection(socket: Socket): void {
    this.socketMainService.handleConnection(socket)
  }

  afterInit(server: ws.WebSocketServer) {
    this.appService
      .getEventsToEmit()
      .asObservable()
      .subscribe({
        next: (event) => {
          server.emit(event.name, event.data)
        }
      })
  }

  @SubscribeMessage('manageDealer')
  handlemManageDealer(client: any, data: any) {
    this.socketDealerService.handleManageDealer(client, data)
  }

  @SubscribeMessage('postCreated')
  handlePostCreatedEvent(@MessageBody() data: any) {
    // Manejar el evento aquí
    console.log('Post creado:', data)
  }

  async handleFindDealer(order: Order) {
    console.log('findDealer', order)
    await this.socketDealerService.handleFindDealer(this.server, order)
  }

  @SubscribeMessage('updateDealerLocation')
  async handleUpdateDealerLocation(client: any, data: any) {
    console.log('updateDealerLocation', data)
    await this.socketDealerService.updateDealerLocation(client, data)
  }

  @SubscribeMessage('joinOrder')
  async handleJoinOrder(client: any, data: any) {
    await this.socketOrderService.joinOrder(client, data)
  }
}
