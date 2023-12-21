import { Injectable } from '@nestjs/common'
import { type Server } from 'socket.io'

@Injectable()
export class SocketShopService {
  updateActiveOrders(socket: Server, shopId: string) {
    socket.to(shopId).emit('updatedActiveOrders')
  }
}
