import { Injectable } from '@nestjs/common'
import { type Socket, type Server } from 'socket.io'

@Injectable()
export class SocketMainService {
  public readonly connectedClients = new Map<string, Socket>()
  public socket: Server = null
  handleConnection(socket: Socket): void {
    const clientId = socket.id
    console.log('clientId connected', socket.handshake.query.userId)
    this.connectedClients.set(clientId, socket)
  }
}
