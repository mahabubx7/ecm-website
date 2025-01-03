import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '~/store'

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute 