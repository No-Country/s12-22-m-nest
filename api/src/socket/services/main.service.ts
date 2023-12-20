import { Injectable } from '@nestjs/common'
import { type Socket, type Server } from 'socket.io'

@Injectable()
export class SocketMainService {
  public readonly connectedClients = new Map<string, Socket>()
  public socket: Server = null

  async handleConnection(socket: Socket) {
    this.connectedClients.set(socket.id, socket)
    if (socket.handshake.query.type === 'shop') {
      await socket.join(socket.handshake.query.userId)
      socket.to(socket.handshake.query.userId).emit('message', 'Bienvenido')
    }
  }

  handleDisconnect(socket: Socket) {
    this.connectedClients.delete(socket.id)
  }
}
