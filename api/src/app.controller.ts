/* eslint-disable @typescript-eslint/indent */
import { Body, Controller, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { type Order } from './socket/interfaces'
import { v4 as uuidv4 } from 'uuid'
import { SocketGateway } from './socket/socket.gateway'
import { Socket } from 'socket.io'
import { SocketDealerService } from './socket/dealer.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly socketGateway: SocketGateway,
    private readonly socketDealerService: SocketDealerService
  ) {}

  @Post('order')
  async createOrder(
    @Body() body: Partial<Order>,
    socket: Socket
  ): Promise<any> {
    // Simulamos la creación de una orden
    const order: Order = {
      id: uuidv4(),
      dealer: null,
      shipAddress: body.shipAddress ?? '',
      shopAddress: body.shopAddress ?? '',
      status: 'Pending',
      step: 1
    }

    return await this.socketDealerService.handleFindDealer(
      this.socketGateway.server,
      order
    )
  }
}
