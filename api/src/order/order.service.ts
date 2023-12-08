import { Injectable, NotFoundException } from '@nestjs/common'
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
import { User } from 'src/users/entities/user.entity'
import { updateOrder } from './common'
import { Chat } from 'src/chat/entities/chat.mongo-entity'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { createChat, findChat } from 'src/chat/common'
import { MailerService } from 'src/mailer/mailer.service'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    private readonly httpService: HttpService,
    private readonly socketOrderService: SocketOrderService,
    private readonly socketGateway: SocketGateway,
    private readonly socketDealerService: SocketDealerService,
    private readonly mailerService: MailerService
  ) {}

  async create(body: CreateOrderDto): Promise<any> {
    const chat = await createChat(this.chatModel)

    const shopCoordinates = await findCoordinates(
      this.httpService,
      body.shopAddress
    )
    const shipCoordinates = await findCoordinates(
      this.httpService,
      body.shipAddress
    )

    const order = this.orderRepository.create({
      dealerId: null,
      shipAddress: body.shipAddress ?? '',
      shopAddress: body.shopAddress ?? '',
      shipCoordinates: JSON.stringify(shipCoordinates),
      shopCoordinates: JSON.stringify(shopCoordinates),
      status: 'Pending',
      step: EnumSteps.LookingForDealer,
      chat: String(chat.id),
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      shop: 'McDonalds',
      price: 300,
      products: JSON.stringify(body.products)
    })

    await this.orderRepository.save(order)

    const orderRequest = formatOrder(order, chat)

    // send mail:
    // eslint-disable-next-line no-template-curly-in-string
    await this.mailerService.sendMail({
      receiverMail: order.clientEmail,
      header: 'Sigue tu orden',
      body: `Hola, este es el link para seguir tu orden:${process.env.CLIENT_URL}/order-tracking/${order.id}`
    })

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
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['dealer']
      })
      if (!order) throw new NotFoundException('Order not found')
      const chat = await findChat(order.chat, this.chatModel)
      const formatedOrder = formatOrder(order, chat)
      return formatedOrder
    } catch (error) {
      console.error(error)
    }
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const orderUpdated = await updateOrder(
      id,
      updateOrderDto,
      this.orderRepository,
      this.userRepository,
      this.socketOrderService,
      this.socketGateway,
      this.chatModel
    )
    if (updateOrderDto.status === 'Canceled') {
      await this.mailerService.sendMail({
        receiverMail: updateOrderDto.clientEmail,
        header: 'Tu orden ha sido cancelada',
        body: 'Hola, te informamos que tu orden ha sido cancelada.'
      })
    }
    return orderUpdated
  }

  async nextStep(orderId: string) {
    let order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['dealer']
    })

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

    const chat = await findChat(order.chat, this.chatModel)
    const formatedOrder = formatOrder(order, chat)

    await this.orderRepository.save(order)
    console.log('formatedOrder', formatedOrder)
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
