import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import ProductCard from '../../components/productCard'
import axios from 'axios'
import './home.css'

const Home = () => {
  const [products, setProducts] = useState([]);

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