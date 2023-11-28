import type { User } from '@/interfaces'
import { Routes } from '@/utils/constants/routes.const'

export interface ItemNavInterface {
  label: string
  key: string
  href: string
  visible: boolean
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default' | undefined
}

export const itemsNavBuilder = (currentUser: User): ItemNavInterface[] => [
  {
    key: Routes.HOME,
    label: 'Home',
    href: Routes.HOME,
    visible: true
  }
]
