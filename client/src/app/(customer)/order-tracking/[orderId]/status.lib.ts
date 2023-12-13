/* eslint-disable @typescript-eslint/member-delimiter-style */
import { type TSteps, EnumSteps } from '@/interfaces'

const status: Record<TSteps, { title: string; message: string }> = {
  [EnumSteps.LookingForDealer]: {
    title: 'Buscando repartidor',
    message: 'Estamos buscando un repartidor para tu pedido'
  },
  [EnumSteps.GoingToShop]: {
    title: 'Yendo al restaurante',
    message: 'El repartidor se encuentra en camino al restaurante'
  },
  [EnumSteps.GettingOrder]: {
    title: 'En espera',
    message: 'El repartidor se encuentra en la dirección del local para retirar tu pedido'
  },
  [EnumSteps.GoingToCustomer]: {
    title: 'En ruta',
    message: 'El repartidor se dirige a la dirección de entrega'
  },
  [EnumSteps.InCustomerPlace]: {
    title: 'En entrega',
    message: 'El repartidor se encuentra en el dirección de entrega'
  },
  [EnumSteps.Delivered]: {
    title: 'Entregado',
    message: 'Tu pedido ha sido entregado'
  }
}

export default status
