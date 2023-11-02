import React, { useState } from 'react'
import './navbar.css'

const Navbar = () => {
 const [nav, setNav] = useState(false)

 const clickHamburger = () => {
  setNav(!nav);
  console.log(nav);
 }

  const printNavmenu = () => {
    if (nav === true) {
      return (
        <div id="nav-mobile-menu">
          <input type="text" placeholder='Search products'/>
          <ul>
            <li><button className='login-btn'>Login</button></li>
            <li><button className='register-btn'>Register</button></li>
          </ul>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div>
      <div id="top-nav">
        <ul>
          <li>Download App</li>
          <li>Become Seller</li>
          <li>Seller Education</li>
        </ul>
      </div>
      <div id="bottom-nav">
        <div id="left-side">
          <h1>Logo</h1>
          <input type="text" placeholder='Search products'/>
        </div>
        <div id="right-side">
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
      <div id="bottom-nav-mobile">
        <h1>Logo</h1>
        <div id="nav-hamburger" onClick={() => clickHamburger()}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {printNavmenu()}
    </div>
  )
}

export default Navbar