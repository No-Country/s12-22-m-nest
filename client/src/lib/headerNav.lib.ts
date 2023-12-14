import type { Type, User } from '@/interfaces'
import { routes } from '@/utils/constants/routes.const'

export const headerNavBuilder = (currentUser: User): ItemNavInterface[] => {
  if (currentUser && !currentUser.id) return items().customer
  return items(currentUser)[currentUser?.type]
}

const items = (user?: User): Record<Type, ItemNavInterface[]> => ({
  dealer: [],
  customer: [
    {
      key: routes.customer.HOME,
      label: 'Inicio',
      href: routes.customer.HOME,
      visible: true
    },
    {
      key: routes.customer.ALL_PRODUCTS,
      label: 'Productos',
      href: routes.customer.ALL_PRODUCTS,
      visible: true
    },
    {
      key: routes.customer.SHOPS,
      label: 'Tiendas',
      href: routes.customer.SHOPS,
      visible: true
    }
  ],
  shop: [
    {
      key: routes.shop.HOME,
      label: 'Inicio',
      href: routes.shop.HOME,
      visible: true
    },
    {
      key: routes.shop.SHOP(user?.shopId || ''),
      label: 'Mi tienda',
      href: routes.shop.SHOP(user?.shopId || ''),
      visible: true
    },
    {
      key: routes.shop.ACTIVE_ORDERS(user?.shopId || ''),
      label: 'Ordenes activas',
      href: routes.shop.ACTIVE_ORDERS(user?.shopId || ''),
      visible: true
    },
    {
      key: routes.shop.CREATE_PRODUCT(user?.shopId || ''),
      label: 'Crear un producto',
      href: routes.shop.CREATE_PRODUCT(user?.shopId || ''),
      visible: true
    }
  ]
})
