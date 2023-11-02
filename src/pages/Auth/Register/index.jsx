import React from 'react'
import './register.css'
import logo from '../../../assets/logo.png';
import illus from '../../../assets/auth-illus.png';
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();

  return (
    <div id='register-page'>
      <div className="auth-logo">
        <img src={logo} alt="" height={"40px"} onClick={() => navigate("/")}/>
      </div>
      <div className="auth-content">
        <div className="auth-image">
          <img src={illus} alt="" height={"420px"}/>
        </div>
        <div className="auth-input-form">
          <h1>Create Account</h1>
          <p>Already have an account? <span style={{cursor:"pointer"}} onClick={() => navigate("/login")}>Log in here</span></p>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input type="text" id='email'/>
            <label htmlFor="pass">Password</label>
            <input type="password" id='pass'/>
            <label htmlFor="confirmPass">Confirm Password</label>
            <input type="password" id='confirmPass'/>
          </div>
          <button>Create</button>
          <p className='bottom-desc'>By creating an account, I understand the Terms & Conditions and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default Register