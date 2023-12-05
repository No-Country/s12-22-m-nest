import { type OrderRequest } from '@/interfaces'
import { type FunctionComponent } from 'react'

interface Props {
  order: OrderRequest
}

const prueba = [
  {
    title: 'Yendo al restaurante',
    message: 'El repartidor se encuentra en camino al restaurante'
  },
  {
    title: 'En espera',
    message: 'El repartidor se encuentra en la dirección del local para retirar tu pedido'
  },
  {
    title: 'En ruta',
    message: 'El repartidor se dirige a la dirección de entrega'
  },
  {
    title: 'En entrega',
    message: 'El repartidor se encuentra en el dirección de entrega'
  }
]

const OrderInfo: FunctionComponent<Props> = ({ order }) => (
    <div className='flex flex-col gap-2'>
        <p className='text-sm'>#{order.id}</p>
        <p className='font-semibold text-lg'>{prueba[order.step - 2].title}</p>
        <p>{prueba[order.step - 2].message}</p>
    </div>
)

export default OrderInfo
