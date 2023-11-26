import { Injectable } from '@nestjs/common'
import { type Socket, type Server } from 'socket.io'

@Injectable()
export class SocketMainService {
  public readonly connectedClients = new Map<string, Socket>()
  public socket: Server = null

  handleConnection(socket: Socket): void {
    this.connectedClients.set(socket.id, socket)
    console.log('connected', socket.id, socket.handshake.query.userId)
  }

  handleDisconnect(socket: Socket): void {
    this.connectedClients.delete(socket.id)
    console.log('disconnected', socket.id, socket.handshake.query.userId)
  }
}
