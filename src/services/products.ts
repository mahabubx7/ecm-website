import api from './api'
import { Product, ProductsResponse } from '~/types'

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

export default {
  getProducts: (params?: ProductsParams) => 
    api.get<ProductsResponse>('/products', { params }),

  getProduct: (id: string) => 
    api.get<Product>(`/products/${id}`),

  getTrending: () => 
    api.get<ProductsResponse>('/products/trending')
} 