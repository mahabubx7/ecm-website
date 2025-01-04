import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '~/types'

export interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  login: (user: User | null, accessToken: string, refreshToken: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      login: (user, act, rft) => set({ 
        user, 
        accessToken: act, 
        refreshToken: rft, 
        isAuthenticated: true 
      }),

      logout: () => set({ 
        user: null, 
        accessToken: null, 
        refreshToken: null, 
        isAuthenticated: false 
      }),
    }),
    { 
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
) 
