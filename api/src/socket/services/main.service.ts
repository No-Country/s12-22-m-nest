import { Injectable } from '@nestjs/common'
import { type Socket, type Server } from 'socket.io'

@Injectable()
export class SocketMainService {
  public readonly connectedClients = new Map<string, Socket>()
  public socket: Server = null

  handleConnection(socket: Socket): void {
    this.connectedClients.set(socket.id, socket)
  }
}
