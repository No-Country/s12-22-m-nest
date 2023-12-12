import type { Type, User } from '@/interfaces'
import { routes } from '@/utils/constants/routes.const'

export const itemsNavBuilder = (currentUser: User): ItemNavInterface[] => items(currentUser)[currentUser?.type]

const items = (user: User): Record<Type, ItemNavInterface[]> => ({
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
    },
    {
      key: routes.dealer.ORDER_HISTORY,
      label: 'Pedidos',
      href: routes.dealer.ORDER_HISTORY,
      visible: true
    }
  ],
  customer: [
    {
      key: routes.customer.ORDER_HISTORY,
      label: 'Pedidos',
      href: routes.customer.ORDER_HISTORY,
      visible: true
    },
    {
      key: routes.customer.ACCOUNT,
      label: 'Cuenta',
      href: routes.customer.ACCOUNT,
      visible: true
    }
  ],
  shop: [
    {
      key: routes.shop.SHOP(user?.shopId || ''),
      label: 'Tienda',
      href: routes.shop.SHOP(user?.shopId || ''),
      visible: true
    },
    {
      key: routes.shop.ORDER_HISTORY,
      label: 'Pedidos',
      href: routes.shop.ORDER_HISTORY,
      visible: true
    },
    {
      key: routes.shop.ACCOUNT,
      label: 'Cuenta',
      href: routes.shop.ACCOUNT,
      visible: true
    }
  ]
})
