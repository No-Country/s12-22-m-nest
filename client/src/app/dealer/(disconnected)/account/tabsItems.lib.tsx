import { type TabBarItemProps } from '@/components/TabBar'
import AccountForm from './_components/Account'
import { type User } from '@/interfaces'
import PasswordForm from './_components/Password'

export const tabsItems = (user: User): TabBarItemProps[] => [
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
]
