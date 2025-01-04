import api from './api'
import { User } from '~/types'

interface AuthResponse {
  user?: User
  access: string
  refresh: string
}

interface RegisterRequest {
  email: string
  password: string
  first_name: string
  last_name: string
}

export default {
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login/', data),

  register: (data: RegisterRequest) =>
    api.post<AuthResponse>('/auth/register/', data)
} 