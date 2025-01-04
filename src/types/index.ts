// import {  } from '@radix-ui/react-icons'
// import type { Icon } from '@radix-ui/react-icons'

export interface Category {
  id: string
  name: string
  slug: string
  parent: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  description: string
  image: string
  is_active: boolean
  stock: number
  category: Category
  category_id: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt?: string
}

export interface ProductsResponse {
  results: Product[]
  next: string
  previous: string
  count: number
}

export interface CartResponse {
  id: string
  user: string
  items: {
    id: string
    cart: string
    product: Product
    product_id: string
    quantity: number
    created_at: string
    updated_at: string
  }[]
  created_at: string
  updated_at: string
}