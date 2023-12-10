import type { User } from '@/interfaces'
import { routes } from '@/utils/constants/routes.const'

export const itemsNavBuilder = (currentUser: User): ItemNavInterface[] => items[currentUser.type]

const items = {
  dealer: [
    {
      key: routes.dealer.AVAILABILITY,
      label: 'Repartir',
      href: routes.dealer.AVAILABILITY,
      visible: true
    },
    {
      key: routes.dealer.ACCOUNT,
      label: 'Cuenta',
      href: routes.dealer.ACCOUNT,
      visible: true
    }
  ],
  customer: [
    {
      key: routes.customer.HOME,
      label: 'Inicio',
      href: routes.customer.HOME,
      visible: true
    },
    {
      key: routes.customer.ACCOUNT,
      label: 'Cuenta',
      href: routes.customer.ACCOUNT,
      visible: true
    }
  ]
}
