import React, { useEffect, useState } from 'react'
import './register.css'
import logo from '../../../assets/logo.png';
import illus from '../../../assets/auth-illus.png';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onRegister = async () => {
    try {
      if (email && password && confirmPassword) {
        if (password === confirmPassword) {
          await axios.post(`${import.meta.env.VITE_API_URL}/account/regis` , {
            email: email,
            password: password,
            confirmPassword: confirmPassword
          })
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigate("/login");
        } else {
          alert("Password and Confirm Pass not same")
        }
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
    <div id='register-page'>
      <div className="auth-logo">
        <img src={logo} alt="" onClick={() => navigate("/")}/>
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
            <input defaultValue={email} type="text" id='email' onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="pass">Password</label>
            <input defaultValue={password} type="password" id='pass' onChange={(e) => setPassword(e.target.value)}/>
            <label htmlFor="confirmPass">Confirm Password</label>
            <input defaultValue={confirmPassword} type="password" id='confirmPass' onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
          <button onClick={() => onRegister()}>Create</button>
          <p className='bottom-desc'>By creating an account, I understand the Terms & Conditions and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default Register