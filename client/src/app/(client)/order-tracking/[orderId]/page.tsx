import { getOrder } from '@/services/orders/getOrder.service'
import { type FunctionComponent } from 'react'
import Tracking from './_tracking/Tracking'
import Finished from './_finished/Finished'

interface Props {
  params: {
    orderId: string
  }
}

// const order = {
//   id: '21d95f25-6424-4fbd-bc07-319260fa134d',
//   shipAddress: 'José María Penna 1610, Banfield, Provincia de Buenos Aires, Argentina',
//   shopAddress: 'Av. Hipólito Yrigoyen 7545, Banfield, Provincia de Buenos Aires, Argentina',
//   status: 'In Progress',
//   step: 2,
//   chat: { id: 'f9a95d33-3ea1-4644-b17f-c4208a5b1493', messages: [] },
//   clientName: 'Pepe Argento',
//   clientEmail: 'pepeargento@ejemplo.com',
//   shop: 'McDonalds',
//   price: 300,
//   products: [
//     { name: 'Hamburguesa con queso', quantity: 1, price: 100 },
//     { name: 'Super Papas', quantity: 2, price: 100 }
//   ],
//   shipCoordinates: { lat: '-34.740019530612244', lon: '-58.407328346938776' },
//   shopCoordinates: { lat: '-34.743248550000004', lon: '-58.39931864702734' },
//   shipMapUrl: 'https://www.google.com/maps/search/?api=1&query=Jos%C3%A9%20Mar%C3%ADa%20Penna%201610,%20Banfield,%20Provincia%20de%20Buenos%20Aires,%20Argentina',
//   shopMapUrl: 'https://www.google.com/maps/search/?api=1&query=Av.%20Hip%C3%B3lito%20Yrigoyen%207545,%20Banfield,%20Provincia%20de%20Bueno%20de%20Buenos%20Aires,%20Argentina'
// }

const OrderTracking: FunctionComponent<Props> = async ({ params }) => {
  const { data: order } = await getOrder(params?.orderId ?? 'null')
  console.log(order)

  return <section className='relative'>{order?.status === 'In Progress' ? <Tracking order={order}/> : <Finished />}</section>
}

export default OrderTracking
