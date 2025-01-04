import api from './api'
import { CartResponse } from '~/types'

interface CartParams {
  page?: number
//   limit?: number
}

export default {
  getCart: (params?: CartParams) => 
    api.get<CartResponse>('/cart/', { params }),
} 