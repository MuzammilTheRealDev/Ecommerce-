import React, { useEffect } from 'react'
import MainRouting from './routes/MainRouting'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { asyncCurrentUser } from './store/actions/UserAction'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncCurrentUser())

  }, [])
  return (
    <>
      <NavBar />
      <MainRouting />
      <Footer />

    </>
  )
}

export default App