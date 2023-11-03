import React, { useEffect, useState } from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import 'boxicons'

const Navbar = () => {
  const navigate = useNavigate();
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
            <li><button onClick={() => navigate("/login")} className='login-btn'>Login</button></li>
            <li><button onClick={() => navigate("/register")} className='register-btn'>Register</button></li>
          </ul>
        </div>
      )
    } else {
      return null
    }
  }

  const printRightNav = () => {
    let userMail = localStorage.getItem("email");
    if (userMail) {
      return (
        <div id='login-nav'>
          <h3>Welcome, {userMail}</h3>
          <i class='bx bx-log-out' onClick={() => onLogout()}></i>
        </div>
      )
    } else {
      return (
        <div id="right-side">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      )
    }
  }

  const onLogout = () => {
    localStorage.clear();
    navigate("/")
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
          <img src={logo} alt="" height={"40px"} onClick={() => navigate("/")}/>
          <input type="text" placeholder='Search products'/>
        </div>
        <div>
          {printRightNav()}
        </div>
      </div>
      <div id="bottom-nav-mobile">
        <img src={logo} alt="" height={"30px"} onClick={() => navigate("/")}/>
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