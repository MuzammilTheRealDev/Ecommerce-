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

const MainRouting = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/admin/create-product' element={<CreateProduct />} />
      <Route path='/product/detail/:id' element={<ProductDetail />} >
        <Route path='update-product' element={<UpdateProduct />} />
      </Route>
      <Route path='/cart' element={<Cart />} />

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default MainRouting