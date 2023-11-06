import React from 'react'
import axios from 'axios'
import './verification.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Verification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const toVerified = async () => {
    console.log(location.search.slice(5));
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/verify`, {
        body: {}
      }, {
        headers: {
          Authorization: `Bearer ${location.search.slice(6)}`
        }
      })
      alert("Account verified Success")
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id='verification-section'>
      <button onClick={() => toVerified()}>Verify</button>
    </div>
  )
}

export default Verification