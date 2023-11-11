import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import ProductCard from '../../components/productCard'
import axios from 'axios'
import './home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/product/`)
    .then((res) => {
      setProducts(res.data)
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getProducts();
  }, [])

  const printCard = () => {
    return products.map((val) => {
      console.log("printcard",val);
      return (
        <ProductCard 
          key = {val.id}
          name = {val.name}
          image = {`${import.meta.env.VITE_API_URL}/public/products/${val.product_images[0].image}`}
          price = {(val.price).toLocaleString("id")}
          storename = {val.account.username}
          onClick = {() => navigate(`/detail/${val.account.username}/${val.name}/${val.id}`)}
        />
      )
    })
  }

  return (
    <Layout>
      <div className="banner-slider">
        <img src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/11/2/e40b8da0-0605-48c3-b69f-f4a67ba5271a.jpg.webp?ect=4g" alt="" width={"100%"}/>
      </div>
      <div id="best-deals">
        <h1>Best deals</h1>
        <div className="products-container">
          {printCard()}
        </div>
      </div>
    </Layout>
  )
}

export default Home