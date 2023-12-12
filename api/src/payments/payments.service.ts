import { Injectable } from '@nestjs/common'
import Stripe from 'stripe'
import { type ProductOrder } from 'src/products/entities/product.entity'
import { ConfigService } from '@nestjs/config'
import { Order } from 'src/order/entities/order.entity'
import { findOrder } from 'src/common/orders.common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
// const stripeCliKey = process.env.STRIPE_WEBHOOK_SECRET

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  private readonly stripeProvider = new Stripe(
    this.configService.get<string>('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16'
    }
  )

  private readonly frontendUrl = this.configService.get<string>('FRONTEND_URL')
  private readonly stripeCliKey = this.configService.get<string>('STRIPE_WEBHOOK_SECRET')
  async create(order: Order, orderProducts: ProductOrder[], orderDistance: number) {
    const products = []
    // const exampleProducts = [ // productos de ejemplo, se recibira como param luego
    //   {
    //     name: 'Triple Queso Carnívoro',
    //     quantity: 1,
    //     price: 480
    //   },
    //   {
    //     name: 'Mediterráneo de Pesto Fresco',
    //     quantity: 1,
    //     price: 520
    //   }
    // ]

    for (let i = 0; i < orderProducts.length; i++) {
      const producto = orderProducts[i]

      products.push({
        quantity: producto.quantity,
        price_data: {
          product_data: {
            name: producto.name
          },
          currency: 'usd',
          unit_amount: producto.price
        }
      })
    }

    const session = await this.stripeProvider.checkout.sessions.create({
      line_items: products,
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: Math.round(((orderDistance * 0.5) * 100)), // El costo de envío en centavos
              currency: 'usd'
            },
            display_name: 'Costo Delevery'

          }
        }
      ],
      mode: 'payment',
      success_url: `${this.frontendUrl}/order-tracking/${order.id}`,
      cancel_url: `${this.frontendUrl}/checkout/${order.id}`,
      payment_intent_data: {
        metadata: {
          // Añadir id de la orden para futura identificacion
          orderId: order.id
        }
      }
    })
    return session.url
  }

  async stripeWebhook(signature: string, payload: Buffer) {
    const stripeEvent: Stripe.Event = await this.stripeProvider.webhooks.constructEventAsync(
      payload,
      signature,
      this.stripeCliKey
    )
    const paymentEventData: Stripe.Event.Data = stripeEvent.data
    const paymentEventMetadata: Stripe.PaymentIntent =
    paymentEventData.object as Stripe.PaymentIntent
    const metadataOrderId = paymentEventMetadata.metadata.orderId
    console.log(paymentEventData)
    const order = await findOrder(metadataOrderId, this.orderRepository, true)
    if (stripeEvent.type === 'payment_intent.succeeded') {
      order.paymentStatus = 'Completed'
    } else if (stripeEvent.type === 'payment_intent.payment_failed') {
      order.paymentStatus = 'Failure'
    }
    await this.orderRepository.save(order)
  }
}
