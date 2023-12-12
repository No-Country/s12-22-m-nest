import AccountForm from '@/app/(common)/account/_components/Account'
import PasswordForm from '@/app/(common)/account/_components/Password'
import ShopForm from '@/app/(common)/account/_components/Shop'
import { type Type, type User } from '@/interfaces'

export const accountTabs = (currentUser: User): TabBarItemProps[] => items(currentUser)[currentUser?.type]

const items = (user: User): Record<Type, TabBarItemProps[]> => ({
  dealer: [
    {
      title: 'Cuenta',
      content: <AccountForm user={user} />,
      visible: true
    },
    {
      title: 'Seguridad',
      content: <PasswordForm user={user} />,
      visible: true
    },
    {
      title: 'Movilidad',
      content: <></>,
      visible: true
    },
    {
      title: 'Documentos',
      content: <></>,
      visible: true
    }
  ],
  customer: [
    {
      title: 'Cuenta',
      content: <AccountForm user={user} />,
      visible: true
    },
    {
      title: 'Seguridad',
      content: <PasswordForm user={user} />,
      visible: true
    }
  ],
  shop: [
    {
      title: 'Cuenta',
      content: <AccountForm user={user} />,
      visible: true
    },
    {
      title: 'Seguridad',
      content: <PasswordForm user={user} />,
      visible: true
    },
    {
      title: 'Tienda',
      content: <ShopForm user={user} />,
      visible: true
    }
  ]
})
