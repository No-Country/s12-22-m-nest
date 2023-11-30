import { Injectable } from '@nestjs/common'
import { orders } from './fakeDb'
import { type Order } from './socket/interfaces/orderRequest.interface'
import { formatOrder } from './utils/formatOrder.utils'
import { HttpService } from '@nestjs/axios'
import { findCoordinates } from './utils/findCoordinates.utils'
import { SocketGateway } from './socket/socket.gateway'
import { SocketDealerService } from './socket/services/dealer.service'
import { v4 as uuidv4 } from 'uuid'
import { SocketOrderService } from './socket/services/order.service'
import { EnumSteps, type TSteps } from './socket/interfaces/step.interface'
import { ChatService } from './chat/chat.service'
import { UsersService } from './users/users.service'

// Simulamos servicios
@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly socketGateway: SocketGateway,
    private readonly socketDealerService: SocketDealerService,
    private readonly socketOrderService: SocketOrderService,
    private readonly chatService: ChatService,
    private readonly usersService: UsersService
  ) {}

  async createOrder(body: Partial<Order>): Promise<any> {
    const chat = await this.chatService.create()

    const shopCoordinates = await findCoordinates(
      this.httpService,
      body.shopAddress
    )
    const shipCoordinates = await findCoordinates(
      this.httpService,
      body.shipAddress
    )

    // Simulamos la creación de una orden
    const order: Order = {
      id: uuidv4(),
      dealer: null,
      shipAddress: body.shipAddress ?? '',
      shopAddress: body.shopAddress ?? '',
      shipCoordinates,
      shopCoordinates,
      status: 'Pending',
      step: EnumSteps.LookingForDealer,
      chat: {
        id: chat.id,
        messages: [],
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt
      },
      clientName: 'Pepe Argento',
      clientEmail: 'pepeargento@ejemplo.com',
      shop: 'McDonalds',
      price: 300,
      products: [
        {
          name: 'Hamburguesa con queso',
          quantity: 1,
          price: 100
        },
        {
          name: 'Super Papas',
          quantity: 2,
          price: 100
        }
      ]
    }

    orders.push(order)

    return await this.socketDealerService.handleFindDealer(
      this.socketGateway.server,
      order
    )
  }

  getAll() {
    return orders
  }

  async getOne(orderId: string) {
    console.log('orderId', orderId)
    const order = orders.filter((order) => order.id === orderId)[0]

    const formatedOrder = formatOrder(order)

    formatedOrder.dealer = await this.usersService.findOneById(order.dealer)

    return formatedOrder
  }

  async updateOrder(orderId: string, body: Partial<Order>) {
    const order = orders.filter((order) => order.id === orderId)[0]
    const index = orders.indexOf(order)
    orders[index] = { ...order, ...body }

    const formatedOrder = formatOrder(orders[index])

    formatedOrder.dealer = await this.usersService.findOneById(order.dealer)

    this.socketOrderService.updateOrder(
      this.socketGateway.server,
      formatedOrder
    )

    return formatedOrder
  }

  async nextStep(orderId: string) {
    const order = orders.filter((order) => order.id === orderId)[0]
    const index = orders.indexOf(order)
    orders[index] = {
      ...order,
      step:
        order.step < EnumSteps.Delivered
          ? ((order.step + 1) as TSteps)
          : EnumSteps.Delivered
    }

    if (orders[index].step === EnumSteps.Delivered) {
      orders[index].status = 'Delivered'
    }

    const formatedOrder = formatOrder(orders[index])

    formatedOrder.dealer = await this.usersService.findOneById(order.dealer)

    this.socketOrderService.updateOrder(
      this.socketGateway.server,
      formatedOrder
    )

    return formatedOrder
  }
}
