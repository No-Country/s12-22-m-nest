import {
  BadRequestException,
  Inject,
  Injectable,
  ServiceUnavailableException,
  forwardRef
} from '@nestjs/common'
import { type Socket, type Server } from 'socket.io'
import { calculateDistance } from 'src/utils/calculateDistance.utils'
import { SocketOrderService } from './order.service'
import { SocketMainService } from './main.service'
import {
  type FormatedSockDealer,
  type SockDealerData
} from '../interfaces/dealer.interface'
import { EnumSteps } from '../../order/entities/step.interface'
import { formatDealerSock } from 'src/utils/formatDealerSock.utils'
import { type OrderRequest } from '../interfaces/orderRequest.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { findOrder, updateOrder } from 'src/common/orders.common'
import { checkIsAvailable } from 'src/utils/isAvailable.utils'
import { Order } from 'src/order/entities/order.entity'
import { SocketGateway } from '../socket.gateway'
import { InjectModel } from '@nestjs/mongoose'
import { Chat } from 'src/chat/entities/chat.mongo-entity'
import { Model } from 'mongoose'

@Injectable()
export class SocketDealerService {
  constructor(
    @Inject(forwardRef(() => SocketGateway))
    private readonly socketGateway: SocketGateway,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    private readonly socketOrderService: SocketOrderService,
    private readonly socketMainService: SocketMainService
  ) {}

  private readonly connectedClients = this.socketMainService.connectedClients

  handleConnection(socket: Socket): void {
    const clientId = socket.id
    this.connectedClients.set(clientId, socket)
  }

  async handleManageDealer(socket: Socket, data: SockDealerData) {
    const { isAvailable, orderId } = await checkIsAvailable(
      socket.handshake.query.userId.toString(),
      this.orderRepository
    )

    socket.data = {
      coordinates: data.coordinates,
      active: data.active,
      taken: !isAvailable,
      asking: false
    }

    console.log(
      'handleManageDealer',
      socket.data,
      socket.id,
      socket.handshake.query.userId.toString()
    )
    socket.emit('dealerStatus', { taken: !isAvailable, orderId })

    console.log('data.taken', isAvailable)

    if (!isAvailable) {
      socket.to(orderId).emit('updatedDealerLocation', data.coordinates)
      socket
        .to(orderId)
        .emit('message', { message: 'El dealer se ha conectado' })
    }
  }

  async updateDealerLocation(socket: Socket, data: any) {
    socket.to(data.orderId).emit('updatedDealerLocation', data)
  }

  async handleFindDealer(server: Server, order: OrderRequest, attempt = 1) {
    console.log('handleFindDealer xxx')
    const dealers = formatDealerSock(Array.from(this.connectedClients.values()))
    const updatedOrder = await findOrder(order.id, this.orderRepository)
    let currentDealer: FormatedSockDealer | null = null
    if (updatedOrder.status !== 'Pending' && updatedOrder.paymentStatus !== 'Completed') {
      console.log('Order is not pending')
      throw new BadRequestException('Order is not pending or payment is not completed')
    }

    for (const dealer of dealers) {
      console.log('buscando for')

      const socket = this.connectedClients.get(dealer.sockId)
      const distance = calculateDistance(
        parseFloat(order.shop.coordinates.lat),
        parseFloat(order.shop.coordinates.lon),
        parseFloat(dealer.coordinates.lat),
        parseFloat(dealer.coordinates.lon)
      )

      if (distance <= 5000) {
        socket.data.asking = true
        console.log('Preguntando a dealer', dealer)
        const acceptOrder = await this.socketOrderService.sendOrderRequest(
          dealer.sockId,
          order
        )
        socket.data.asking = false
        if (acceptOrder) {
          currentDealer = dealer
          socket.data.taken = true
          break
        }
      }
    }

    if (!currentDealer && attempt < 5) {
      console.log('currentDealer recursion', currentDealer)
      console.log(
        `No dealer found. Retrying in 1 minute (attempt ${attempt}/5)`
      )
      await new Promise((resolve) => setTimeout(resolve, 60000))
      await this.handleFindDealer(server, order, attempt + 1)
    }

    if (currentDealer === null) {
      await updateOrder(
        order.id,
        {
          status: 'In Progress'
        },
        this.orderRepository,
        this.userRepository,
        this.socketOrderService,
        this.socketGateway,
        this.chatModel
      )
      throw new ServiceUnavailableException("We couldn't find a dealer")
    }

    await this.connectedClients.get(currentDealer.sockId).join(order.id)

    const savedOrder = await updateOrder(
      order.id,
      {
        dealerId: currentDealer.clientId,
        status: 'In Progress',
        step: EnumSteps.GoingToShop
      },
      this.orderRepository,
      this.userRepository,
      this.socketOrderService,
      this.socketGateway,
      this.chatModel
    )

    console.log('savedOrder', savedOrder)
    server.to(order.id).emit('orderAssigned', savedOrder)

    return savedOrder
  }
}
