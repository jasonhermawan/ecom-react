import React, { useEffect, useState } from 'react'
import './dashboard.css'
import Layout from '../../../Layout'
import axios from 'axios'
import ProductDashCard from '../../../components/ProductDashCard'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

const Dashboard = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [productsList, setProductsList] = useState([]);

  const token = localStorage.getItem("token");

  const getStoreProducts = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/product/store`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setProductsList(res.data)
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getStoreProducts();
  },[])

  const deleteProduct = async (id, accountid) => {
    console.log(token);
    console.log(accountid);
    console.log(id);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/product/${accountid}/${id}`, {
        headers : {
          Authorization: `Bearer ${token}`
        }
      })
      toast({
        title: 'Product deleted.',
        description: "Product has been deleted from your store.",
        position: "top",
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStoreProducts();
  },[deleteProduct()])

  const printProductsList = () => {
    return productsList.map((val) => {
      return (
        <ProductDashCard
          key = {val.id}
          name = {val.name}
          image = {`${import.meta.env.VITE_API_URL}/public/products/${val.product_images[0].image}`}
          price = {(val.price).toLocaleString("id")}
          accountid = {val.accountid}
          onDelete = {() => deleteProduct(val.id, val.accountid)}
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