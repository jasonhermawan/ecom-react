import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import AddProductPage from './pages/Store/AddProduct'
import EditProfilePage from './pages/EditProfile'
import Dashboard from './pages/Store/Dashboard'
import EditProductPage from './pages/Store/EditProduct'
import Verification from './pages/Verification'
import ProductDetail from './pages/ProductDetail'
import StoreProfile from './pages/StoreProfile'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/verification' element={<Verification />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/add-product' element={<AddProductPage />}/>
        <Route path='/store/manage' element={<Dashboard />}/>
        <Route path='/store/edit-product/:id' element={<EditProductPage />}/>
        <Route path='/account/settings' element={<EditProfilePage />}/>
        <Route path='/detail/:store/:name/:itemid' element={<ProductDetail />}/>
        <Route path='/profile/:store/:storeid' element={<StoreProfile />}/>
      </Routes>
    </div>
  )
}

export default App
