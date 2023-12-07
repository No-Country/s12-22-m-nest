'use client'
import { Routes } from '@/utils/constants/routes.const'
import { Switch } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { type FunctionComponent } from 'react'

const TopBar: FunctionComponent = () => {
  const router = useRouter()
  return (
    <section className='padding-general-x flex w-full items-center justify-center rounded-2xl  pb-5'>
      <div className='flex w-full flex-col items-start 2xl:container'>
        <div className='flex w-full items-center gap-3'>
          <h1 className='text-2xl'>
            Actualmente estas <b>desconectado</b>
          </h1>
          <Switch
            onValueChange={() => {
              router.push(Routes.WAITING_ORDER)
            }}
            size='sm'
          />
        </div>
        <p>Cambia tu estado a activo para comenzar a recibir pedidos</p>
      </div>
    </section>
  )
}

export default TopBar
