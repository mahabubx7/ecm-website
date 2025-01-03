import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '~/types'

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (product, quantity = 1) => {
        const items = [...get().items]
        const existingItem = items.find(item => item.id === product.id)

        if (existingItem) {
          existingItem.quantity += quantity
        } else {
          items.push({ ...product, quantity })
        }

        set({
          items,
          total: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        })
      },
      removeItem: (productId) => {
        const items = get().items.filter(item => item.id !== productId)
        set({
          items,
          total: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        })
      },
      updateQuantity: (productId, quantity) => {
        const items = get().items.map(item => 
          item.id === productId ? { ...item, quantity } : item
        )
        set({
          items,
          total: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        })
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    { name: 'cart-storage' }
  )
) 