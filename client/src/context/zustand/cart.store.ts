import { type Product } from '@/interfaces'
import { toast } from 'sonner'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CartState {
  items: Product[]
  addItem: (item: Product) => void
  removeItem: (item: string) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const itemInCart = state.items.find((i) => i.shop.id === item.shop.id)

          if (itemInCart && itemInCart.shop.id !== item.shop.id) {
            toast.error('No puedes agregar productos de otro restaurante')
            return state
          }

          if (state.items.includes(item)) {
            toast.info('Ya tienes este producto en el carrito')
            return state
          }

          return { items: [...state.items, item] }
        })
      },
      removeItem: (item) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== item) }))
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
