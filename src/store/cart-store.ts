import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartResponse, Product } from '~/types'

interface CartItem extends Product {
}

interface CartState {
  items: CartItem[]
  total: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  setCart: (cart: CartResponse) => void
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
          existingItem.stock += quantity
        } else {
          items.push({ ...product, stock: quantity })
        }

        set({
          items,
          total: items.reduce((sum, item) => sum + item.price * item.stock, 0)
        })
      },
      removeItem: (productId) => {
        const items = get().items.filter(item => item.id !== productId)
        set({
          items,
          total: items.reduce((sum, item) => sum + item.price * item.stock, 0)
        })
      },
      updateQuantity: (productId, quantity) => {
        const items = get().items.map(item => 
          item.id === productId ? { ...item, quantity } : item
        )
        set({
          items,
          total: items.reduce((sum, item) => sum + item.price * item.stock, 0)
        })
      },
      clearCart: () => set({ items: [], total: 0 }),
      setCart: (cart) => set({ items: cart.items.map(item => item.product), total: cart.items.length }),
    }),
    { name: 'cart-storage' }
  )
) 