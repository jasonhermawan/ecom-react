import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import AddProductPage from './pages/Store/AddProduct'
import EditProfilePage from './pages/EditProfile'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/add-product' element={<AddProductPage />}/>
        <Route path='/account/settings' element={<EditProfilePage />}/>
      </Routes>
    </div>
  )
}

export default App
