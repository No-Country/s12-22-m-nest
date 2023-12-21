'use client'
import NextLink from 'next/link'
import { signOut } from 'next-auth/react'
import type { User } from '@/interfaces'
import { type FunctionComponent } from 'react'
import { itemsNavBuilder } from '@/lib/userNav.lib'
import { useRouter } from 'next/navigation'

interface Props {
  loggedUser: User
}

const Menu: FunctionComponent<Props> = ({ loggedUser }) => {
  const router = useRouter()
  const items: ItemNavInterface[] = itemsNavBuilder(loggedUser)
  const dangerStyle = 'bg-red-50 text-red-800 hover:bg-red-50 hover:text-red-800'

  const handleSignOut = async (): Promise<void> => {
    void signOut({ redirect: false })
    router.push('/')
  }
  return (
    <div className='flex w-full flex-col'>
      {items?.map((item, index) => (
        <NextLink
          href={item.href}
          className={`w-full rounded-xl p-2 hover:bg-slate-100 ${item.color === 'danger' ? dangerStyle : ''}`}
          key={index}
        >
          {item.label}
        </NextLink>
      ))}
      <button
        onClick={handleSignOut}
        className={`w-full rounded-xl bg-white p-2 text-start font-semibold hover:bg-red-100 ${dangerStyle}`}
      >
        Cerrar sesión
      </button>
    </div>
  )
}

export default Menu
