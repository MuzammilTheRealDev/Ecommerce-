import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import PageNotFound from '../components/PageNotFound'
import Products from '../pages/Products'
import Cart from '../pages/Cart'
import CreateProduct from '../features/admin/product/Create'
import UpdateProduct from '../features/admin/product/Update'
import ProductDetail from '../features/admin/product/ProductDetail'
import Profile from '../features/user/Profile'
import { PrivateRoute, PublicRoute } from './AuthWrapper'

const MainRouting = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/cart' element={<Cart />} />


      <Route path='/admin/create-product' element={
        <PrivateRoute>
          <CreateProduct />
        </PrivateRoute>
      } />

      <Route path='/product/detail/:id' element={
        <PrivateRoute>
          <ProductDetail />
        </PrivateRoute>
      } >
        <Route path='update-product' element={
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        } />
      </Route>

      <Route path='/user-profile' element={
        <PrivateRoute>
          <Profile />

        </PrivateRoute>
      } />

      <Route path='/login' element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path='/register' element={
        <PrivateRoute>
          <Register />
        </PrivateRoute>
      } />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default MainRouting