// import {  } from '@radix-ui/react-icons'
// import type { Icon } from '@radix-ui/react-icons'

export interface Category {
  id: string
  name: string
  slug: string
  icon: any
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  discountPercentage?: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt?: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
}