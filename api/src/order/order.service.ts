import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { Repository } from 'typeorm'
import { type UpdateOrderDto } from './dto/update-order.dto'
import { findCoordinates } from 'src/utils/findCoordinates.utils'
import { HttpService } from '@nestjs/axios'
import { formatOrder } from 'src/utils/formatOrder.utils'
import { SocketOrderService } from 'src/socket/services/order.service'
import { SocketGateway } from 'src/socket/socket.gateway'
import { EnumSteps, type TSteps } from 'src/order/entities/step.interface'
import { SocketDealerService } from 'src/socket/services/dealer.service'
import { type CreateOrderDto } from './dto/create-order.dto'
import { ChatService } from 'src/chat/chat.service'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly httpService: HttpService,
    private readonly socketOrderService: SocketOrderService,
    private readonly socketGateway: SocketGateway,
    private readonly socketDealerService: SocketDealerService,
    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService
  ) {}

  async create(body: CreateOrderDto): Promise<any> {
    const chat = await this.chatService.create()

    const shopCoordinates = await findCoordinates(
      this.httpService,
      body.shopAddress
    )
    const shipCoordinates = await findCoordinates(
      this.httpService,
      body.shipAddress
    )

    const order = this.orderRepository.create({
      dealer: null,
      shipAddress: body.shipAddress ?? '',
      shopAddress: body.shopAddress ?? '',
      shipCoordinates: JSON.stringify(shipCoordinates),
      shopCoordinates: JSON.stringify(shopCoordinates),
      status: 'Pending',
      step: EnumSteps.LookingForDealer,
      chat: String(chat.id),
      clientName: 'Pepe Argento',
      clientEmail: 'pepeargento@ejemplo.com',
      shop: 'McDonalds',
      price: 300,
      products: JSON.stringify(body.products)
    })

    await this.orderRepository.save(order)

    const orderRequest = formatOrder(order, chat)

    return await this.socketDealerService.handleFindDealer(
      this.socketGateway.server,
      orderRequest
    )
  }

  async findAll() {
    try {
      return await this.orderRepository.find()
    } catch (error) {
      console.error(error)
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderRepository.findOneBy({ id })
      if (!order) throw new NotFoundException('Order not found')
      const chat = await this.chatService.getChatWithMessages(order.chat)
      const formatedOrder = formatOrder(order, chat)
      return formatedOrder
    } catch (error) {
      console.error(error)
    }
  }

  async findOneByDealer(id: string) {
    try {
      return await this.orderRepository.findOneBy({ dealer: id })
    } catch (error) {
      console.error(error)
    }
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    let order = await this.orderRepository.findOneBy({ id })
    if (!order) throw new NotFoundException('Order not found')
    order = { ...order, ...updateOrderDto }
    console.log(order)
    await this.orderRepository.save(order)

    const chat = await this.chatService.getChatWithMessages(order.chat)
    const formatedOrder = formatOrder(order, chat)

    formatedOrder.dealer = await this.usersService.findOneById(order.dealer)

    this.socketOrderService.updateOrder(
      this.socketGateway.server,
      formatedOrder
    )

    return formatedOrder
  }

  async nextStep(orderId: string) {
    let order = await this.orderRepository.findOneBy({ id: orderId })

    if (!order) throw new NotFoundException('Order not found')

    order = {
      ...order,
      step:
        order.step < EnumSteps.Delivered
          ? ((order.step + 1) as TSteps)
          : EnumSteps.Delivered
    }

    if (order.step === EnumSteps.Delivered) {
      order.status = 'Delivered'
    }

    const chat = await this.chatService.getChatWithMessages(order.chat)
    const formatedOrder = formatOrder(order, chat)

    formatedOrder.dealer = await this.usersService.findOneById(order.dealer)

    await this.orderRepository.save(order)

    this.socketOrderService.updateOrder(
      this.socketGateway.server,
      formatedOrder
    )

    return formatedOrder
  }

  async remove(id: string) {
    try {
      const order = await this.orderRepository.findOneBy({ id })
      if (!order) throw new Error('Order not found')
      await this.orderRepository.delete(id)
      return order
    } catch (error) {
      console.error(error)
    }
  }
}
