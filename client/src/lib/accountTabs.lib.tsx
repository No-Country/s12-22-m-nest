import AccountForm from '@/app/(common)/account/_components/Account'
import PasswordForm from '@/app/(common)/account/_components/Password'
import { type User } from '@/interfaces'

export const accountTabs = (currentUser: User): TabBarItemProps[] => items(currentUser)[currentUser?.type]

const items = (user: User): Record<string, TabBarItemProps[]> => ({
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
  ]
})
