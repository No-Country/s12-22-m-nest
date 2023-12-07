'use client'
import { Routes } from '@/utils/constants/routes.const'
import { Switch } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { type FunctionComponent } from 'react'
import BaseTopBar from './Base'

export enum Title {
  DISCONNECTED = 'Actualmente estas desconectado',
  CONNECTED = 'Ya estas conectado'
}

export enum Description {
  DISCONNECTED = 'Cambia tu estado a activo para comenzar a recibir pedidos',
  WAITING_ORDER = '¡Prepárate para recibir pedidos!',
  IN_ORDER = 'Orden en curso'
}

interface Props {
  title: 'CONNECTED' | 'DISCONNECTED'
  description: 'DISCONNECTED' | 'WAITING_ORDER' | 'IN_ORDER'
  switch: boolean
  isSwitchActive: boolean
}

const TopBarDealer: FunctionComponent<Props> = ({ title, description, switch: switch_, isSwitchActive }) => {
  const router = useRouter()
  const pushLocation = description === 'DISCONNECTED' ? Routes.WAITING_ORDER : Routes.DEALER_HOME
  return (
    <BaseTopBar>
      <div className='flex w-full flex-col items-start 2xl:container'>
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
    </BaseTopBar>
  )
}

export default TopBarDealer
