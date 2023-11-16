import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import ProductCard from "../../components/productCard";
import axios from "axios";
import "./home.css";
import { useNavigate } from "react-router-dom";
import StoreCard from "../../components/StoreCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [storeName, setStoreName] = useState([]);
  const navigate = useNavigate();

  const getProducts = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/product/`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const printCard = () => {
    return products.map((val) => {
      console.log("printcard", val);
      return (
        <ProductCard
          key={val.id}
          name={val.name}
          image={`${import.meta.env.VITE_API_URL}/public/products/${
            val.product_images[0].image
          }`}
          price={val.price.toLocaleString("id")}
          storename={val.account.username}
          onClick={() =>
            navigate(`/detail/${val.account.username}/${val.name}/${val.id}`)
          }
        />
      );
    });
  };

  const getStoreName = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/account?role=store`)
    .then((res) => {
      setStoreName(res.data)
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getStoreName();
  }, []);

  const printStoreCard = () => {
    return storeName.map((val) => {
      console.log("print store card", val);
      return (
        <StoreCard 
          name={val.username}
          onclick={() => navigate(`/profile/${val.username}/${val.id}`)}
        />
      )
    })
  }

  return (
    <Layout>
      <div id="homepage">
        <div className="banner-slider">
          <img
            src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/11/2/e40b8da0-0605-48c3-b69f-f4a67ba5271a.jpg.webp?ect=4g"
            alt=""
            width={"100%"}
          />
        </div>
        <div id="best-deals">
          <h1>Best deals</h1>
          <div className="products-container">{printCard()}</div>
        </div>
        <div id="store-showcase">
          <h1>Top Seller</h1>
          <div id="store-card-container">
            {printStoreCard()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
