import React from 'react'
import Login from './components/Pages/Login'
import Signup from './components/Pages/Signup'
import { Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <Routes>  
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
   
  )
}

export default App