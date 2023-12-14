import { Button } from '@/components'
import { type Session } from 'next-auth'
import Image from 'next/image'
import { type FunctionComponent } from 'react'
import { routes } from '@/utils/constants/routes.const'
import { type User } from '@/interfaces'

interface Props {
  session: Session | null
  user: User
}

const Hero: FunctionComponent<Props> = ({ session, user }) => (
  <section className='flex w-full flex-col items-center justify-between gap-4 2xl:container lg:flex-row'>
    <div className='flex flex-col items-center justify-center gap-3 lg:flex-row lg:justify-start'>
      <Image
        src={user?.profileImage || '/image/placeholder.png'}
        alt='profile image'
        width={80}
        height={80}
        className='aspect-square rounded-full object-cover'
      />
      <div>
        <h1 className='text-center text-2xl lg:text-start'>
          Hola,{' '}
          <b>
            {user?.firstName} {user?.lastName}
          </b>
        </h1>
        <p className='text-center lg:text-start'>Bienvenido a tu cuenta</p>
      </div>
    </div>
    <Button title='Historial de pedidos' href={routes.dealer.ORDER_HISTORY} />
  </section>
)

export default Hero
