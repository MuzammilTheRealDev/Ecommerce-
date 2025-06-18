import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const Home = lazy(() => import('../pages/Home'))
const PageNotFound = lazy(() => import('../components/PageNotFound'))
const Products = lazy(() => import('../pages/Products'))
const Cart = lazy(() => import('../pages/Cart'))
const CreateProduct = lazy(() => import('../features/admin/product/Create'))
const UpdateProduct = lazy(() => import('../features/admin/product/Update'))
const ProductDetail = lazy(() => import('../features/admin/product/ProductDetail'))
const Profile = lazy(() => import('../features/user/Profile'))
import { PrivateRoute, PublicRoute } from './AuthWrapper'

const MainRouting = () => {
  return (
    <Suspense fallback={<div className="text-center py-20 text-lg">Loading...</div>}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />


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

        <Route path='/cart' element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        } />

        <Route path='/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path='/register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Suspense>
  )
}

export default MainRouting