import React from 'react'
import { Navigate, Route, Routes, Link } from 'react-router-dom'
import Home from "./pages/Home";
import GoToCart from "./pages/GoToCart";



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/cart' element={<GoToCart />} />
      </Routes>
    </div>
  )
}

export default App