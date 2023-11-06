import React, { useEffect, useState } from 'react'
import './dashboard.css'
import Layout from '../../../Layout'
import productCard from  '../../../components/productCard'
import ProductCard from '../../../components/productCard'
import axios from 'axios'
import ProductDashCard from '../../../components/ProductDashCard'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();

  const [productsList, setProductsList] = useState([]);

  const token = localStorage.getItem("token");

  const getStoreProducts = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/product/store/${token}`)
    .then((res) => {
      setProductsList(res.data)
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getStoreProducts();
  },[])

  const deleteProduct = async (id, userid) => {
    console.log(token);
    console.log(userid);
    console.log(id);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/product/${token}/${userid}/${id}`)
      alert("Product Deleted")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStoreProducts();
  },[deleteProduct])

  const printProductsList = () => {
    return productsList.map((val) => {
      return (
        <ProductDashCard
          key = {val.id}
          name = {val.name}
          image = {val.image}
          price = {(val.price).toLocaleString("id")}
          userid = {val.userid}
          onDelete = {() => deleteProduct(val.id, val.userid)}
          onEdit = {() => navigate(`/store/edit-product/${val.id}`)}
        />
      )
    })
  }

  return (
    <Layout>
      <div id='store-dash'>
        <h1 className='dash-title'>Manage Product</h1>
        <div id='store-products-list'>
          {printProductsList()}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard