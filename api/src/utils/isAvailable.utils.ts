import { findActiveOrderByDealer } from 'src/order/common'
import { type Order } from 'src/order/entities/order.entity'
import { type Repository } from 'typeorm'

export const checkIsAvailable = async (
  id: string,
  orderRepository: Repository<Order>
) => {
  const orders = await findActiveOrderByDealer(id, orderRepository)
  const isAvailable = Boolean(!orders || orders?.length === 0)
  return {
    isAvailable,
    orderId: isAvailable ? null : orders[0].id
  }
}
