import React, { useEffect } from 'react'
import MainRouting from './routes/MainRouting'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { asyncCurrentUser } from './store/actions/UserAction'
import { useDispatch } from 'react-redux'
import { asyncLoadProduct } from './store/actions/ProductAction'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      dispatch(asyncCurrentUser());
    }
    dispatch(asyncLoadProduct())

  },[dispatch])
  return (
    <>
      <NavBar />
      <MainRouting />
      <Footer />

    </>
  )
}

export default App