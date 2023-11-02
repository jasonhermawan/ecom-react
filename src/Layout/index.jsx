import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './layout.css'

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <div className="container layout-content">
        {props.children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout