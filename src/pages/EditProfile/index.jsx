import React, { useState } from 'react'
import './editProfile.css'
import Layout from '../../Layout'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const EditProfilePage = () => {
  const currentUsername = localStorage.getItem("username");
  const currentEmail = localStorage.getItem("email");
  const currentPhone = localStorage.getItem("phone");

  const [newUsername, setNewUsername] = useState(currentUsername);
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [newPhone, setNewPhone] = useState(currentPhone);

  const toast = useToast();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const onSubmitEdit = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/account/update`, {
        username: newUsername,
        email: newEmail,
        phone: newPhone,
      }, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      localStorage.setItem("username", newUsername);
      localStorage.setItem("email", newEmail);
      localStorage.setItem("phone", newPhone);
      navigate("/")
      toast({
        title: 'Update data success.',
        description: "Your account data is updated.",
        position: "top",
        status: 'success',
        duration: 7000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div id="account-settings">
        <h1 id='edit-title'>Edit Account</h1>
        <fieldset>
          <div className="edit-profile-pic">
            <img
              className="profile-picture"
              src="https://images.tokopedia.net/img/cache/300/tPxBYm/2023/1/20/bc329335-3ba7-43d2-a2ee-75162ac97055.jpg"
              alt=""
              height={"150px"}
              onMouseEnter={() => setProfileClick(true)}
              style={{cursor: "pointer"}}
            />
            <div id='edit-pp-input'>
              <button>Upload new photo</button>
              <p>At least 800x800 px recommended. <br /> JPG or PNG is allowed</p>
            </div>
          </div>
          <hr className='divider'/>
          <div className="edit-account-info">
            <h3>Personal Info</h3>
            <div className="input-field">
              <div className="input-content">
                <label htmlFor="username">Username</label>
                <input defaultValue={currentUsername} type="text" id='username' placeholder='Set your username' onChange={(e) => setNewUsername(e.target.value)}/>
              </div>
              <div className="input-content">
                <label htmlFor="email">Email</label>
                <input defaultValue={currentEmail} type="email" id='email' onChange={(e) => setNewEmail(e.target.value)}/>
              </div>
              <div className="input-content">
                <label htmlFor="phone">Phone</label>
                <input defaultValue={currentPhone} type="text" id='phone' placeholder='Set your phone number' onChange={(e) => setNewPhone(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className="btn-container">
            <button className='update-btn' onClick={() => onSubmitEdit()}>Update Data</button>
          </div>
        </fieldset>
      </div>
    </Layout>
  )
}

export default EditProfilePage