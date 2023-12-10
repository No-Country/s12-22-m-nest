import { toast } from 'sonner'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CartState {
  items: string[]
  addItem: (item: string) => void
  removeItem: (item: string) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          console.log(state.items)
          if (state.items.includes(item)) {
            toast.info('Ya tienes este producto en el carrito')
            return state
          }

          return { items: [...state.items, item] }
        })
      },
      removeItem: (item) => {
        set((state) => ({ items: state.items.filter((i) => i !== item) }))
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
