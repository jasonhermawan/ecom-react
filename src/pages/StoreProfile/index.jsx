import React, { useEffect, useState } from "react";
import "./storeProfile.css";
import Layout from "../../Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../../components/productCard";

const StoreProfile = () => {
  const [storeProducts, setStoreProducts] = useState([]);
  const [storeName, setStoreName] = useState("");

  const navigate = useNavigate();

  const params = useParams();

  const getStoreProducts = () => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/product?accountid=${params.storeid}`
      )
      .then((res) => {
        setStoreProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStoreAccount = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/account?id=${params.storeid}`)
      .then((res) => {
        setStoreName(res.data[0].username);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getStoreProducts();
    getStoreAccount();
  }, []);

  const printProductCard = () => {
    if (storeProducts.length) {
      return storeProducts.map((val) => {
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
    } else {
      return <h3>Store has no product</h3>;
    }
  };

  return (
    <Layout>
      <div id="store-profile-page">
        <div id="store-profile-detail">
          <h1>{storeName}</h1>
        </div>
        <div id="store-products-container">{printProductCard()}</div>
      </div>
    </Layout>
  );
};

export default StoreProfile;
