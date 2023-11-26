import { HttpService } from '@nestjs/axios'
import {
  Inject,
  Injectable,
  ServiceUnavailableException,
  forwardRef
} from '@nestjs/common'
import { type Socket, type Server } from 'socket.io'
import { calculateDistance } from 'src/utils/calculateDistance.utils'
import { SocketOrderService } from './order.service'
import { SocketMainService } from './main.service'
import { findCoordinates } from 'src/utils/findCoordinates.utils'
import {
  type SockDealer,
  type DealerData
} from '../interfaces/dealer.interface'
import { type Order } from '../interfaces/orderRequest.interface'
import { formatOrder } from 'src/utils/formatOrder.utils'
import { AppService } from 'src/app.service'
import { EnumSteps } from '../interfaces/step.interface'
import { formatDealerSock } from 'src/utils/formatDealerSock.utils'

@Injectable()
export class SocketDealerService {
  constructor(
    @Inject(forwardRef(() => AppService))
    private readonly orderService: AppService,
    private readonly httpService: HttpService,
    private readonly socketOrderService: SocketOrderService,
    private readonly socketMainService: SocketMainService
  ) {}

  private readonly connectedClients = this.socketMainService.connectedClients

  handleConnection(socket: Socket): void {
    const clientId = socket.id
    console.log('clientId connected', socket.handshake.query.userId)
    this.connectedClients.set(clientId, socket)
  }

  async handleManageDealer(socket: Socket, data: DealerData) {
    const { isAvailable, orderId } =
      await this.orderService.checkDealerAvailability(
        socket.handshake.query.userId.toString()
      )
    socket.data = {
      coordinates: data.coordinates,
      active: data.active,
      taken: !isAvailable
    }

    console.log('handleManageDealer', socket.data, socket.id)
    socket.emit('dealerStatus', { taken: !isAvailable, orderId })
  }

  async updateDealerLocation(socket: Socket, data: any) {
    const userId = socket.handshake.query.userId
    console.log('updateDealerLocation, user:', userId)
    socket.to(data.orderId).emit('updatedDealerLocation', data)
  }

  async handleFindDealer(socket: Server, order: Order) {
    console.log('Buscando Dealer')
    const shopCoordinates = await findCoordinates(
      this.httpService,
      order.shopAddress
    )
    const shipCoordinates = await findCoordinates(
      this.httpService,
      order.shipAddress
    )

    const orderRequest = formatOrder(order, shipCoordinates, shopCoordinates)
    const dealers = formatDealerSock(Array.from(this.connectedClients.values()))
    let currentDealer: SockDealer | null = null

    for (const dealer of dealers) {
      const distance = calculateDistance(
        parseFloat(shopCoordinates.lat),
        parseFloat(shopCoordinates.lon),
        parseFloat(dealer.coordinates.lat),
        parseFloat(dealer.coordinates.lon)
      )

      if (distance <= 5) {
        console.log('Preguntando a dealer', dealer)
        const acceptOrder = await this.socketOrderService.sendOrderRequest(
          dealer.sockId,
          orderRequest
        )
        if (acceptOrder) {
          currentDealer = dealer
          const socket = this.connectedClients.get(currentDealer.sockId)
          console.log('CurrentDealer', socket)
          socket.data.taken = true
          break
        }
      }
    }

    // TODO: O se cancela la orden o se pone en espera
    if (currentDealer === null) {
      throw new ServiceUnavailableException("We couldn't find a dealer")
    }

    await this.connectedClients.get(currentDealer.sockId).join(order.id)

    return await this.orderService.updateOrder(order.id, {
      dealer: currentDealer.clientId,
      status: 'In Progress',
      step: EnumSteps.GoingToShop
    })
  }
}
