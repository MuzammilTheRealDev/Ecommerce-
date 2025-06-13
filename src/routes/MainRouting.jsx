import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import PageNotFound from '../components/PageNotFound'
import Products from '../pages/Products'
import Cart from '../pages/Cart'

const MainRouting = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products/> } />
      <Route path='/cart' element={<Cart/> } />

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default MainRouting