import React from 'react'
import './login.css'
import logo from '../../../assets/logo.png'
import illus from '../../../assets/auth-illus.png';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();

  return (
    <div id='login-page'>
      <div className="auth-logo">
        <img src={logo} alt="" height={"40px"} onClick={() => navigate("/")}/>
      </div>
      <div className="auth-content">
        <div className="auth-image">
          <img src={illus} alt="" height={"420px"}/>
        </div>
        <div className="auth-input-form">
          <h1>Welcome Back!</h1>
          <p>Don't have an account? <span style={{cursor:"pointer"}} onClick={() => navigate("/register")}>Register here</span></p>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input type="text" id='email'/>
            <label htmlFor="pass">Password</label>
            <input type="password" id='pass'/>
          </div>
          <button>Log in</button>
          <p className='bottom-desc'>Forgot your password? <span>Recover here</span></p>
        </div>
      </div>
    </div>
  )
}

export default Login