/* eslint-disable @typescript-eslint/indent */
'use client'
import { routes } from '@/utils/constants/routes.const'
import { Switch } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { type FunctionComponent } from 'react'
import BaseTopBar from './Base'
import { Button } from '@/components'
import Link from 'next/link'

export enum Title {
  DISCONNECTED = 'Actualmente estas desconectado',
  CONNECTED = 'Ya estas conectado',
  ON_SHOP = 'Retira el pedido',
  GOING_CUSTOMER = 'Dirigete al cliente',
  GOING_SHOP = 'Dirigete al comercio',
  ON_RESIDENCE = 'Entrega el pedido'
}

export enum Description {
  DISCONNECTED = 'Cambia tu estado a activo para comenzar a recibir pedidos',
  WAITING_ORDER = '¡Prepárate para recibir pedidos!',
  IN_ORDER = 'Orden en curso',
  ON_SHOP = 'Verifica que el pedido sea correcto',
  GOING_CUSTOMER = 'Ve a entregar el pedido',
  GOING_SHOP = 'Ve a buscar el pedido',
  ON_RESIDENCE = 'Toca el timbre y espera'
}

interface Props {
  title: 'CONNECTED' | 'DISCONNECTED' | 'ON_SHOP' | 'GOING_CUSTOMER' | 'GOING_SHOP' | 'ON_RESIDENCE'
  description:
    | 'DISCONNECTED'
    | 'WAITING_ORDER'
    | 'IN_ORDER'
    | 'ON_SHOP'
    | 'GOING_CUSTOMER'
    | 'GOING_SHOP'
    | 'ON_RESIDENCE'
  switch?: boolean
  button?: boolean
  buttonAction?: () => Promise<void> | void
  buttonTitle?: string
  mapButton?: boolean
  mapButtonLink?: URL
  isSwitchActive: boolean
}

const TopBarDealer: FunctionComponent<Props> = ({
  title,
  description,
  button = false,
  buttonTitle = '',
  switch: switch_ = false,
  isSwitchActive,
  buttonAction,
  mapButton = false,
  mapButtonLink = ''
}) => {
  const router = useRouter()
  const pushLocation = description === 'DISCONNECTED' ? routes.dealer.WAITING_ORDER : routes.dealer.AVAILABILITY

  return (
    <BaseTopBar>
      <div className='flex w-full items-center justify-between 2xl:container'>
        <div className='flex w-full flex-col items-start'>
          <div className='flex w-full items-center gap-3'>
            <h1 className='text-2xl'>{Title[title]}</h1>
            {switch_ && (
              <Switch
                isSelected={isSwitchActive}
                onValueChange={() => {
                  router.push(pushLocation)
                }}
                size='sm'
              />
            )}
          </div>
          <p>{Description[description]}</p>
        </div>
        <div className='flex gap-2'>
          {button && <Button title={buttonTitle} onClick={buttonAction} />}
          {mapButton && (
            <Link target='_blank' href={mapButtonLink.toString() ?? ''}>
              <Button title='Ver en Google Maps' variant='flat' />
            </Link>
          )}
        </div>
      </div>
    </BaseTopBar>
  )
}

export default TopBarDealer
