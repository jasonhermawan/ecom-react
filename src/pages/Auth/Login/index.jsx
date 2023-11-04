import React, { useEffect, useState } from 'react'
import './login.css'
import logo from '../../../assets/logo.png'
import illus from '../../../assets/auth-illus.png';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      if (email && password) {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/account/login` , {
          email,
          password
        })
        localStorage.setItem("token", result.data.result.token);
        localStorage.setItem("role", result.data.result.role);
        localStorage.setItem("email", result.data.result.email);
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        alert("Fill all the form")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("email")) {
      navigate("/")
    }
  })

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
            <input defaultValue={email} type="text" id='email' onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="pass">Password</label>
            <input defaultValue={password} type="password" id='pass' onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button onClick={() => onLogin()}>Log in</button>
          <p className='bottom-desc'>Forgot your password? <span>Recover here</span></p>
        </div>
      </div>
    </div>
  )
}

export default Login