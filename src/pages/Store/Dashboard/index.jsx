import React, { useEffect, useState } from 'react'
import './dashboard.css'
import Layout from '../../../Layout'
import productCard from  '../../../components/productCard'
import ProductCard from '../../../components/productCard'
import axios from 'axios'

const Dashboard = () => {
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

  const printProductsList = () => {
    return productsList.map((val) => {
      return (
        <ProductCard 
          name = {val.name}
          image = {val.image}
          price = {(val.price).toLocaleString("id")}
          userid = {val.userid}
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