import api from './api'
import { Category, Product, ProductsResponse } from '~/types'

interface ProductsParams {
  category?: string | null
  search?: string | null
  sort?: string | null
  minPrice?: string | null
  maxPrice?: string | null
  brands?: string[] | null
  page?: number
  limit?: number
}

interface PaginatedResponse<T> {
  count: number
  next: string | null | number
  previous: string | null | number
  results: T[]
}

export default {
  getProducts: (params?: ProductsParams) => 
    api.get<ProductsResponse>('/products/', { params }),

  getProduct: (id: string) => 
    api.get<Product>(`/products/${id}`),

  getTrending: () => 
    api.get<ProductsResponse>('/products/trending/'),

  getCategories: () =>
    api.get<PaginatedResponse<Category>>('/products/categories/'),
} 