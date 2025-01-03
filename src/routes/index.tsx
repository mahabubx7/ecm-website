import { Routes, Route } from 'react-router-dom'
import Layout from '~/components/Layout'
import ProtectedRoute from './ProtectedRoute'

// Pages
import Home from '~/pages/Home'
import Shop from '~/pages/Shop'
import Product from '~/pages/Product'
import Cart from '~/pages/Cart'
import Dashboard from '~/pages/Dashboard'
import Login from '~/pages/auth/Login'
import CreateAccount from '~/pages/auth/CreateAccount'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:product_id" element={<Product />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/create-account" element={<CreateAccount />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes 